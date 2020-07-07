import axios from 'axios';
import { SERVER_URL} from '../utils/constants';


export function serviceCall() {
  return axios.post(`${SERVER_URL}`);
}

export function callDummyAPI(select, openAmount,doctype) {
  return axios.post(
    `http://localhost:8080/1728202/dummy.do`,
    {},
    {
      headers: { 'Content-Type': 'application/json' },
      params: {
        invoice_id: select, 
        open_amount: openAmount, 
        doc_type : doctype
      },

    }
  );
}
