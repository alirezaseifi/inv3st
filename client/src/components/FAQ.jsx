import React, { Component } from 'react';

export default class FAQ extends Component {
  render() {
    return (
      <div className="faq-container">
        <div className="faq-hdr">
          <h1 className="faq-title">Frequently Asked Questions</h1>
        </div>
        <div className="faq-content">
          <ul className="faq-items">
            <li className="faq-item">
              <p className="faq-question" id="how">How does Inwest work?</p>
              <p className="faq-answer">After signing up for an Inwest account you will be asked to link it with a bank account of your choice and a Coinbase account.</p>

              <p className="faq-answer">
              Once both accounts are verified, Inwest will immediately begin rounding up and aggregating spare change from your daily financial transactions. At the end of every month, Inwest will send the these rounded-up funds to your Coinbase account. 
              </p>


              <p className="faq-answer">
              Based on overall crypto-market sentiment and Inwest’s own technical signal analysis, your monthly funds are invested for you into a mix of Bitcoin (BTC), Ethereum (ETH), and Litecoin (LTC). 
              </p>


              <p className="faq-answer">
              It’s quick, it’s easy, and requires no effort or expertise once your account is set up.
              </p>

              <p className="faq-answer">
              Example: Spending $4.45 on a latte today would add $0.55 to your monthly total. At the end of the month, the $0.55 from the latte transaction along with the rounded up funds from other transactions would be added up and transferred to your Coinbase account and subsequently invested in BTC, ETH, and LTC. 
              </p>


            </li>

            <li className="faq-item">
              <p className="faq-question">How secure is Inwest?</p>
              <p className="faq-answer">Inwest takes security very seriously. Your peace of mind is our highest priority. All of your data is protected with 128-bit encryption. We use tokens provided by Plaid.com to pull transaction information, so your banking / Coinbase credentials are never stored on our servers.</p>
            </li>


            <li className="faq-item">
              <p className="faq-question">Inwest Fees</p>
              <p className="faq-answer">The first month is free! If you continue to use our product after the first month, Inwest will charge your Coinbase account $1 monthly. You may opt-out at any time, no questions asked.</p>
            </li>

            <li className="faq-item">
              <p className="faq-question">Is there a discount for yearly service?</p>
              <p className="faq-answer">Yes, we offer discounts on up-front long-term commitments. please reach out to us by email.</p>
            </li>


            <li className="faq-item">
              <p className="faq-question">Coinbase Fees?</p>
              <p className="faq-answer">Please check out <a href="https://support.coinbase.com/customer/portal/articles/2109597-buy-sell-bank-transfer-fees" className="faq-link">coinbase</a> for more details.</p>
            </li>


            <li className="faq-item">
              <p className="faq-question">Who works on Inwest?</p>
              <p className="faq-answer">Inwest was created by a team of individuals passionate about crypto-currency to provide greater ease and access to crypto-currency investing. We think everyone should have a chance at participating in the exciting crypto-currency market, without having to do months of research or spend many thousands of dollars to do it (but you are welcome invest a lot, if you like).</p>
            </li>
            <li className="faq-item">
              <p className="faq-question">How do I contact Inwest?</p>
              <p className="faq-answer">The best way to get in touch is to send us a <a href="https://twitter.com/inwest_io" className="faq-link">tweet</a>. If you notice any bugs or inconsistencies on the site, please let us know! Also you can join our <a href="https://t.me/joinchat/BOPq6RG1v7iz040Otxt6BA" className="faq-link">Telegram channel</a></p>

            </li>
            <li className="faq-item">
              <p className="faq-question">Can I help or get involved in any way?</p>
              <p className="faq-answer">I’m always on the lookout for folks to help work on app development or design. Inwest is built with Node.js and React, so experience with those technologies is a plus.</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
