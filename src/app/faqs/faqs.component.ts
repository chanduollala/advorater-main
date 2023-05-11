import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {


  question = [
    {
      text: 'What is Advorater?',
      answer: 'Advorater is a legal portal for all your law-related needs! We are a curated online marketplace\n' +
        '            that connects our network of lawyers with business clients. We are a one-stop platform to ask,\n' +
        '            answer, discuss legal questions, and from time to time, we even post legal updates and news for\n' +
        '            those of you who can’t get enough of law-related newsbytes!',
    },
    {
      text: 'Is Advorater a law firm?',
      answer: 'Advorater is not a law firm. The responses provided to the law-related queries are deliberately bite-sized for easy comprehension and are in no means a full opinion. These should not be taken as absolute and the lawyers posting these responses are only doing so out of goodwill and to provide general public legal assistance. Please note that this does not create a client-lawyer relationship. We inform all clients that the services we provide are not, and should never be, a substitute for legal advice from a lawyer.By using Advorater, the lawyers on our platform also do not advertise nor solicit business from potential clients. In fact, what is unique about Advorater is that clients themselves post their queries or come with their cases on our platform looking for lawyers. Ultimately, the client determines who he/she wishes to engage as his/her lawyer.',
    },
    {
      text: 'What kinds of questions can I ask?',
      answer: 'You can ask about anything related to your legal situation, such as questions about a specific process, documents or forms related to your legal matter, or about the meaning of specific terms or phrases. You can ask for advice, strategic coaching, or insight into possible outcomes. Advice sessions and document review services are also a good way to get a second opinion about your legal issue.\n' +
        '          ',
    },
    {
      text: 'How do I Search a lawyer?',
      answer: 'If you are looking for a lawyer, you can start by clicking on find a lawyer at the top of the page. This will take you to the Find a Lawyer page, where you can search based on ratings and reviews posted by other users, expertise, location and a few other criteria like years of experience, gender, languages spoken, etc. Expertise helps you find lawyers that are suitable for your requirement and location mentions where they practice.',
    },
    {
      text: 'How do I compare lawyers?',
      answer: 'Lawyers on Advorater platform complete a thorough profile about their education, background, and practice for you to review. You might want to consider (1) how much experience the lawyer has; and (2) whether the lawyer has a particular expertise in the exact problem you are encountering. But selecting a lawyer is a very personal decision, so Advorater tries to provide as much information as possible about the lawyers in our network.\n' +
        '  ',
    },
    {
      text: 'How does Advorater select the lawyers who appear on the shortlist I see?',
      answer: 'Advorater uses many objective factors such as the geography, practice specialty, ratings and reviews posted by users, and your legal needs, as well as your expressed preferences to generate the list of lawyers.\n' +
        '          ',
    },
    {
      text: 'How do I know if the lawyer I found is good for my needs and has the right skills and experience?',
      answer: 'We only work with lawyers who are licensed to practice in your state. A lawyer’s profile has been designed in a concise yet informative way. Going through a lawyer’s profile can give you insights about his expertise and experience, making it easier for you to make the right choice.\n' +
        '          ',
    },
    {
      text: 'What if I’m not sure that I need to speak to a lawyer?',
      answer: 'You can check Advorater\'s Blog to get answer for some of your related questions .',
    },
    {
      text: 'How can I keep my identity private while asking questions?',
      answer: 'Your query and lawyer responses will be a 1-1 discussion over call/mails etc. We do NOT publish your name or contact details. Lawyers who answer your query may contact you to discuss your query in detail.\n' +
        '         ',
    },
    {
      text: 'When can I expect a reply to my question?',
      answer: 'Lawyers on Advorater have different and unique expertise. We work to serve your question to the right lawyer for a quick and useful response. You can expect to get a response in 24 working hours after posting your question. Lawyers on Advorater are active and are passionate about helping you solve your legal problems, meaning you won’t have to wait very long to get answers.\n' +
        '          ',
    },
    {
      text: 'How can I find if my question was answered?',
      answer: 'We will notify you by Email whenever your question receives an answered.',
    },
    {
      text: 'When I use “Talk to a Lawyer" service, is that information private?',
      answer: 'Yes. Your request is private. However, it is not a confidential communication between you and your lawyer, and therefore is not covered by Attorney-Client privilege. This means you should not include any information in your request that you would only feel comfortable sharing with the lawyer you end up working with. Confidentiality matters, so please err on the side of caution when you fill out the information to “Talk to a Lawyer.”\n' +
        '          ',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
