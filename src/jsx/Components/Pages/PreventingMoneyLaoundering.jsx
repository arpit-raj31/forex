import React from 'react';

const PreventingMoneyLaundering = () => { 
  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#362465] mb-4 ml-60">Preventing Money Laundering</h1>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Definition of Money Laundering</h2>
            <p className="text-gray-700 leading-relaxed">
              Modern society currently faces a serious challenge in preventing money laundering, e.g. making the
              possession, use, or disposal of money or other property obtained from criminal activities appear to be
              legal, and terrorism financing - providing or gathering money or rendering financial services with the
              knowledge that the money is intended to finance the organization, preparation for, or execution of terrorist
              acts or to support a criminal society (criminal organization) created or being created to perform terrorist
              acts.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Individuals and legal entities whose income is earned illegally make various attempts to legalize their
              income. For example, they may use other people's personal data, including data that has been acquired
              fraudulently. This may become a problem for people who become victims of fraud and are uninvolved in
              these parties' criminal activities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">2. Laws Against Money Laundering</h2>
            <p className="text-gray-700 leading-relaxed">
              To prevent money laundering, organizations performing operations with money or other property are
              obligated to comply with anti-money laundering laws, verify the identity of clients, and assist government
              agencies and financial organizations working to combat money laundering. Exness does everything
              required to ensure compliance with laws against money laundering and financing terrorism.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Client Identity Verification Procedure</h2>
            <p className="text-gray-700 leading-relaxed">
              As part of complying with laws on client identification, this procedure is performed during registration,
              various types of non-trading operations, and as part of monitoring by our specialists. In order to identify our
              clients, Exness Group may ask you for personal data and take steps to confirm the accuracy of this
              information using a verification system developed by our specialists. It may take several work days to
              complete this process.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Compliance with the Privacy Agreement</h2>
            <p className="text-gray-700 leading-relaxed">
              The personal data we receive is handled in accordance with the provisions of the Privacy Agreement.
              Please note that the reason for the identification procedure is to comply with laws against money
              laundering and financing terrorism, not because we suspect you of committing illegal acts. Accordingly,
              your cooperation and understanding of these steps is necessary to effectively combat money laundering
              and financing terrorism.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PreventingMoneyLaundering;
