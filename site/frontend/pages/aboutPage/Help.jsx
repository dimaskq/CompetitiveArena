function Help() {
  return (
    <div className="arena">
      <div className="arena__section">
        <h2 className="arena__title">Help Center</h2>

        <div className="arena__section">
          <h3 className="arena__subtitle">1. How to create an account?</h3>
          <p className="arena__text">
            Click “Login with Steam” in the top right corner. Once
            authenticated, you'll be redirected to your profile page.
          </p>
        </div>

        <div className="arena__section">
          <h3 className="arena__subtitle">2. How to join the beta test?</h3>
          <p className="arena__text">
            Fill out the form on the homepage with your email address.
          </p>
        </div>

        <div className="arena__section">
          <h3 className="arena__subtitle">3. Can I change my email address?</h3>
          <p className="arena__text">
            Currently this feature is not available. Contact support if you've
            entered a wrong email.
          </p>
        </div>

        <div className="arena__section">
          <h3 className="arena__subtitle">4. I found a bug – what do I do?</h3>
          <p className="arena__text">
            We appreciate your feedback! Please email a detailed report to
            dmtro.kravchenko@gmail.com.
          </p>
        </div>

        <div className="arena__section">
          <h3 className="arena__subtitle">5. Still need help?</h3>
          <p className="arena__text">
            Feel free to contact us through our support form or write directly
            to dmtro.kravchenko@gmail.com.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Help;
