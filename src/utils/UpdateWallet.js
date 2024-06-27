import axios from 'axios';
import Service_URL from './Constant';

//get Wallet Details
export async function getBalance(userId) {
  try {
    const response = await axios.get(
      `${Service_URL}/wallet/get-by-id/${userId}`,
    );

    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 404) {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
}

//recharge

export async function walletRecharge({
  transactionId,
  userId,
  walletId,
  description,
  amount,
}) {
  const data = {
    transactionId,
    userId,
    walletId,
    description,
    amount,
  };
  try {
    const response = await axios.post(
      `${Service_URL}/transaction/recharge`,
      data,
    );
    return response;
  } catch (error) {}
}

