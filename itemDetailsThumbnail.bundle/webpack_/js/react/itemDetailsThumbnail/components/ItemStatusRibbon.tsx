import React from 'react';
import { TranslateFunction } from 'react-utilities';
// import { TItemStatus } from '../../avatarShopHomepageRecommendations/utils/itemCardUtils';
import { TItemStatus } from 'react-style-guide';

export function ItemRestrictionRibbon({
  itemStatuses,
  translate
}: {
  itemStatuses: Array<TItemStatus>;
  translate: TranslateFunction;
}): JSX.Element {
  return (
    <React.Fragment>
      {itemStatuses !== undefined && itemStatuses.length > 0 && (
        <div className='asset-status-icon'>
          {itemStatuses.map((status: TItemStatus) => {
            return (
              <div
                className={`${status.isIcon ? 'has-icon' : ''} ${status.class} asset-status-text`}
                key={status.type}>
                {status.isIcon && <span className={status.type} />}
                {!!status.label && <span>{translate(status.label)}</span>}
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
}

export default ItemRestrictionRibbon;
