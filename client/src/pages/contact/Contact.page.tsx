import * as React from 'react';
import ContactForm from '../../components/contact-form/ContactForm.component';
import ResumeList from '../../components/resume-list/ResumeList.component';

import * as style from './style/contact-page.style';

const Contact = (): JSX.Element => {
  return (
    <style.ContactPage>
      <ContactForm />
      <ResumeList />
    </style.ContactPage>
  );
};

export default Contact;
