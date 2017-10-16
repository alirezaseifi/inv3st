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
              <p className="faq-answer">Inwest rounds up spare change from daily financial transactions and at the end of every month sends the sum to your Coinbase account. For example, spending $7.20 on a burrito will add $0.80 to your monthly total. Connect your bank account to Inwest after signing up and the app will immediately begin rounding up and tallying spare change as you make transactions.</p>

              <p className="faq-answer">
              So based on crypto market sentimet, Inwest invests your spare-change into either BTC, ETH, LTC. Trust our judgment :)
              </p>

            </li>
            <li className="faq-item">
              <p className="faq-question">Inwest Fees:</p>
              <p className="faq-answer"> We take $1 in Ethereum or Bitcoin out of your Coinbase account every month as long as you are actively investing spare change through our system. You can choose which account we debit from under your settings. If you turn your investing off, we don't charge you a fee. This charge starts one month after you have connected both your Coinbase and banking card.</p>
            </li>

            <li className="faq-item">
              <p className="faq-question">Who works on Inwest?</p>
              <p className="faq-answer">Inwest is created and maintained by a team of individuals with the passion and purpose of advancing the practice of investment through crypto-currency.</p>
            </li>
            <li className="faq-item">
              <p className="faq-question">How do I contact Inwest?</p>
              <p className="faq-answer">The best way to get in touch is to send an email to <a href="mailto:m4seifi@gmail.com" className="faq-link">me</a>. If you notice any bugs or inconsistencies on the site, please let us know!</p>
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
