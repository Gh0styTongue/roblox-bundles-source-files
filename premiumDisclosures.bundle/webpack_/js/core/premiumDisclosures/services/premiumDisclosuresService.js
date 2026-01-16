import { TranslationResourceProvider, Intl } from 'Roblox';
import PremiumDisclosures from '../components/premiumDisclosures';

function show(productName, renewalCadence, renewalDate, redirectToMobilePurchase, priceNumber, currencyCode) {
  const translationProvider = new TranslationResourceProvider();
  const premiumLangMap = translationProvider.getTranslationResource('Feature.Premium');
  const controlsLangMap = translationProvider.getTranslationResource('CommonUI.Controls');

  const htmlElement = document.createElement('div');
  htmlElement.className = 'premium-disclosure-container-base';
  document.body.appendChild(htmlElement);

  const selector = '.premium-disclosure-container-base';
  const dateFormatter = new Intl().getDateTimeFormatter();
  const formattedDate = dateFormatter.getShortDate(renewalDate, 'short');
  const component = new PremiumDisclosures(
    selector,
    productName,
    renewalCadence,
    premiumLangMap.get('Label.RenewsOn', { renewDate: formattedDate }),
    redirectToMobilePurchase,
    premiumLangMap,
    controlsLangMap,
    priceNumber,
    currencyCode
  );
  component.attach();
}

const PremiumDisclosuresService = {
  show
};

export default PremiumDisclosuresService;
