
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
    }
  }, [location]);

  return null;
};

export default ExternalHtmlComponent;

