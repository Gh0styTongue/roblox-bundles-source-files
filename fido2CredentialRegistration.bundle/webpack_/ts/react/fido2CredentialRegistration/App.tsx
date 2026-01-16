import React from 'react';
import { WithTranslationsProps, withTranslations } from 'react-utilities';
import Fido2CredentialRegistrationContainer from './containers/Fido2CredentialRegistrationContainer';
import { TRANSLATION_CONFIG } from './app.config';
import { Fido2CredentialRegistrationContextProvider } from './store/contextProvider';
import { EventServiceDefault } from './services/eventService';
import { RequestServiceDefault } from '../../common/request';
import { CredentialPurpose } from './constants/types';
import { Fido2Credential } from '../../common/request/types/twoStepVerification';

const requestServiceDefault = new RequestServiceDefault();

const eventServiceDefault = new EventServiceDefault();

type Props = {
  onCreationSuccess?: () => void;
  onDuplicateCreated?: () => void;
  onDeleteSuccess?: () => void;
  onLastKeyDeleted?: () => void;
  onGenericError?: () => void;
  registeredKeys?: Fido2Credential[];
  fido2Supported?: boolean;
  credentialPurpose: CredentialPurpose;
  deleteAllPasskeysAllowed?: boolean;
} & WithTranslationsProps;

const noop = () => {
  // Do nothing.
};

const App: React.FC<Props> = ({
  translate,
  onCreationSuccess = noop,
  onDuplicateCreated = noop,
  onDeleteSuccess = noop,
  onLastKeyDeleted = noop,
  onGenericError = noop,
  registeredKeys = [],
  fido2Supported,
  credentialPurpose,
  deleteAllPasskeysAllowed
}: Props) => {
  return (
    <Fido2CredentialRegistrationContextProvider
      translate={translate}
      eventService={eventServiceDefault}
      requestService={requestServiceDefault}
      onCreationSuccess={onCreationSuccess}
      onDuplicateCreated={onDuplicateCreated}
      onDeleteSuccess={onDeleteSuccess}
      onLastKeyDeleted={onLastKeyDeleted}
      onGenericError={onGenericError}
      credentialPurpose={credentialPurpose}
      registeredKeys={registeredKeys}
      fido2Supported={fido2Supported}
      deleteAllPasskeysAllowed={deleteAllPasskeysAllowed}>
      <Fido2CredentialRegistrationContainer />
    </Fido2CredentialRegistrationContextProvider>
  );
};

App.defaultProps = {
  onCreationSuccess: noop,
  onDuplicateCreated: noop,
  onDeleteSuccess: noop,
  onLastKeyDeleted: noop,
  onGenericError: noop,
  registeredKeys: [],
  fido2Supported: undefined,
  deleteAllPasskeysAllowed: true
};

export default withTranslations(App, TRANSLATION_CONFIG);
