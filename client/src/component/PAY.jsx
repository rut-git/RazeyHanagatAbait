// import { useEffect } from 'react';

// const ExternalHtmlComponent = () => {
//   useEffect(() => {
//     const url = 'https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-4G087447EP5108817MZEP5PA';
//     window.location.href = url;
//   }, []);

//   return null;
// };

// export default ExternalHtmlComponent;
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ExternalHtmlComponent = () => {
  const location = useLocation();

  useEffect(() => {
    const url = 'https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-06L36741NK963622AMZEQQSY';
    window.location.href = url;
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    const payerId = query.get('PayerID');

    if (token && payerId) {
      // יש לך את הטוקן וה-PayerID, תוכלי לבצע בדיקה נוספת מול השרת שלך או PayPal
      console.log('Payment successful with token:', token, 'and PayerID:', payerId);
    }
  }, [location]);

  return null;
};

export default ExternalHtmlComponent;

