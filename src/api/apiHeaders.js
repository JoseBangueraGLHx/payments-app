import authTokenManager from "../utils/authTokenManager";
import { generateSecureRandomId } from "../utils/secureRandomIdGenerator";

export const buildAuthHeaders = () => {
  const token = authTokenManager.getToken();

  return {
    ...authTokenManager(token && { Authorization: `Bearer ${token}` }),
    "x-api-key": process.env.REACT_APP_API_KEY,
    "x-wu-serviceid": "trx-inquiry",
    "x-wu-externalRefId": `TRXINQUIRY-${generateSecureRandomId()}`,
  };
};
