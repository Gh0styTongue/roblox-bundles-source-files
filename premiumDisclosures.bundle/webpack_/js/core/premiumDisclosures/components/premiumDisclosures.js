import { paymentFlowAnalyticsService } from 'core-roblox-utilities'
import urls from '../constants/premiumDisclosuresConstants';

function PremiumDisclosures(
  selector,
  productName,
  renewalCadence,
  renewalDate,
  redirectToMobilePurchase,
  premiumLangMap,
  controlsLangMap,
  priceNumber,
  currencyCode
) {
  const hostElement = document.querySelector(selector);
  hostElement.className = 'premium-disclosure-container';

  const detach = () => {
    document
      .querySelector('.premium-disclosure-container')
      .classList.add('premium-disclosure-container-closed');
  };

  const addListeners = () => {
    document.querySelector('.purchase-button').addEventListener('click', () => {
      paymentFlowAnalyticsService.sendUserPurchaseFlowEvent(
        paymentFlowAnalyticsService.ENUM_TRIGGERING_CONTEXT.WEBVIEW_PREMIUM_PURCHASE,
        true,
        paymentFlowAnalyticsService.ENUM_VIEW_NAME.PREMIUM_DISCLOSURES,
        paymentFlowAnalyticsService.ENUM_PURCHASE_EVENT_TYPE.USER_INPUT,
        paymentFlowAnalyticsService.ENUM_VIEW_MESSAGE.PURCHASE
      );
      redirectToMobilePurchase();
      detach();
    });
    document.querySelector('.cancel-button').addEventListener('click', () => {
      paymentFlowAnalyticsService.sendUserPurchaseFlowEvent(
        paymentFlowAnalyticsService.ENUM_TRIGGERING_CONTEXT.WEBVIEW_PREMIUM_PURCHASE,
        true,
        paymentFlowAnalyticsService.ENUM_VIEW_NAME.PREMIUM_DISCLOSURES,
        paymentFlowAnalyticsService.ENUM_PURCHASE_EVENT_TYPE.USER_INPUT,
        paymentFlowAnalyticsService.ENUM_VIEW_MESSAGE.CANCEL
      );
      detach();
    });
    document
      .querySelector('.premium-disclosure-container')
      .addEventListener('transitionend', () => {
        hostElement.innerHTML = '';
        hostElement.className = '';
        document.body.classList.remove('no-overflow');
      });
  };

  const attach = () => {
    const continueButton = premiumLangMap.get('Action.Purchase');
    const priceContainer = `<span class="fiat-product-price"></span>`;
    const disclosures = premiumLangMap.get(
      'Description.MobilePremiumDisclosuresWithRevocationAcceptance',
      {
        button: continueButton,
        chargeAmount: priceContainer,
        privacyLinkStart: `<a href="${urls.privacyPageUrl}" class="text-link" target="_blank">`,
        privacyLinkEnd: '</a>',
        termsLinkStart: `<a href="${urls.termsPageUrl}" class="text-link" target="_blank">`,
        termsLinkEnd: '</a>',
        revocationLinkStart: `<a href="${urls.revocationPolicyUrl}" class="text-link" target="_blank">`,
        revocationLinkEnd: '</a>',
        cancelMembershipInfoLinkStart: `<a href="${urls.cancelMembershipInfoUrl}" class="text-link" target="_blank">`,
        cancelMembershipInfoLinkEnd: '</a>'
      }
    );

    const productNameContainer = `<h3 class="product-name">${productName}</h3>`;
    const renewalInfo = `
      <div class="renewal-info text-default">
        <div>${renewalCadence}</div>
        <div>${renewalDate}</div>
      </div>
    `;

    const disclosuresContainer = `<div class="disclosures text-default">${disclosures}</div>`;
    const buttons = `
      <div class="disclosures-button">
        <button class="btn-growth-lg btn-full-width purchase-button">${continueButton}</button>
        <button class="btn-control-lg btn-full-width cancel-button">${controlsLangMap.get(
          'Action.Cancel'
        )}</button>
      </div>
    `;
    document.body.classList.add('no-overflow');
    hostElement.innerHTML = `${productNameContainer}${renewalInfo}${priceContainer}${disclosuresContainer}${buttons}`;
    window.dispatchEvent(
      new CustomEvent('price-tag:render', {
        detail: {
          targetSelector: '.fiat-product-price',
          tagClassName: 'd-inline',
          amount: priceNumber,
          currencyCode: currencyCode
        }
      })
    );
    addListeners();
  };

  return {
    attach
  };
}

export default PremiumDisclosures;
