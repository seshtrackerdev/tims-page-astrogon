import type { FAQModule } from '../../types/discovery/resources';

export const CAI_FAQS: FAQModule = {
  id: 'cai-faqs',
  title: 'Conversational AI FAQs',
  description: 'Common technical questions about CAI that come up during and after demos.',
  type: 'faq',
  url: 'https://solutions.teamdynamix.com/TDClient/1965/Portal/KB/PrintArticle?ID=152529',
  tags: ['CAI', 'Technical', 'Sales'],
  faqs: [
    {
      question: 'How will the bot handle questions for ESM?',
      answer: `For Version 1 we can support ESM in 2 different ways:

1. Create one bot application trained with utterances for all departments. This works well if one group will be building or administrating the bot, or if the groups can work together to administer the bot in one application.

2. Create a bot application for each knowledge area (IT, HR, Mkt, Admissions). This is for groups that would like to administer their own bot. Each group would have its own bot application specific to their knowledge domain. In Version 1, we will not have the ability to share knowledge between bot applications, however, it is on our roadmap to provide this ability after initial launch.`,
      category: 'ESM Integration'
    },
    {
      question: 'How will SSO/authentication work?',
      answer: `Two authentication methods are supported:

1. If the bot is embedded in TDX work management, and they have signed on the portal can pass a token to the bot. This would require setting up a connection between work management and CAI.

2. If they are not authenticated this way, bot conversation flows can also have an authentication step.`,
      category: 'Authentication'
    },
    {
      question: 'Do you have a starter bot with intents built in?',
      answer: 'We will have pre-built intents that you can choose from to get you started quickly.',
      category: 'Implementation'
    },
    {
      question: 'Where does TeamDynamix actually use AI?',
      answer: `TeamDynamix uses AI in several ways:

1. To match an utterance to an intent
2. Using generative AI to assist in creating utterances
3. Using AI to help create Questions and Answers from a public URL or pasted text content
4. Using a connector to connect to AI and receive a response`,
      category: 'AI Technology'
    },
    {
      question: 'Can you crawl content to create and maintain the bot?',
      answer: 'Not in version 1. We have done extensive research on this and found that the technology is not yet ready and requires a lot of manual updates to keep it accurate. However, we can leverage AI to help create Q & A from a single site on pasted text, that can be added as intents.',
      category: 'Content Management'
    },
    {
      question: 'Can you customize the bot?',
      answer: 'Yes, you can update the name and colors of the bot.',
      category: 'Customization'
    },
    {
      question: 'How many hours does it take to maintain?',
      answer: 'Initially when you go live the bot should take around 5-10 hours a week to maintain. After most utterances and intents are accounted for, it will take much less time.',
      category: 'Maintenance'
    },
    {
      question: 'What metrics do you have pre-built to measure chatbot performance?',
      answer: `TDX Conversational AI has a dedicated section for bot metrics. This dashboard includes:

1. Conversation Count (Daily, Weekly, Monthly, Yearly)
2. Intent Count (Daily, Weekly, Monthly, Yearly)
3. Response Quality (Daily, Weekly, Monthly, Yearly)
4. Top 10 Intents (Daily, Weekly, Monthly, Yearly)
5. Response Ratings
6. Match Confidence`,
      category: 'Analytics'
    },
    {
      question: 'How does the ticket ingestion work?',
      answer: `The ticket ingestion process works as follows:

1. Create a report in TDX with the application & ticket IDs you care about
2. Ingest the report
3. It will then pull all the data for those tickets you had in the report - including data from the tickets + any text documents
4. When someone asks about the tickets, it will scrape the tickets it knows about that the user has access to (either in TDNext or in the portal) and respond back to them.`,
      category: 'Ticket Integration'
    },
    {
      question: 'What type of training model do you use?',
      answer: `We currently use a static training model as default. Clients have the OPTION to introduce generative AI responses should they choose. For example:

1. A customer could design a conversation which first sends the user "utterance" to the static training data
2. If a confident answer is not returned, the customer could decide to pass the same utterance to OpenAI or another LLM
3. It is their choice. At this point training is not being driven by generative AI as the technology is not mature enough yet.`,
      category: 'AI Technology'
    },
    {
      question: 'What if AI responds with something that is incorrect? How can we correct it?',
      answer: 'There is no correcting the AI, because that gets into things like machine learning which we do not do right now. They can play around with the confidence levels for that knowledge set (in the choreographer), set additional filters in the knowledge set, and update the verbiage in the sources to better match what the end users are asking.',
      category: 'AI Technology'
    }
  ]
}; 