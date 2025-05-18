import type { PublicRequestorModule } from '~/types/discovery/public-requestor';

export const PUBLIC_REQUESTOR_MODULE: PublicRequestorModule = {
  id: 'public-requestor',
  title: 'Non-AD User/Public Requestor Information',
  description: 'Information about handling tickets submitted by users without AD accounts (public requestors) through the service catalog.',
  type: 'public-requestor',
  formFields: [
    {
      name: 'First Name',
      required: true,
      notes: 'Always appears first in the form'
    },
    {
      name: 'Last Name',
      required: true,
      notes: 'Appears second in the form'
    },
    {
      name: 'Email Address',
      required: true,
      notes: 'Used for requestor matching if enabled'
    },
    {
      name: 'Phone Number',
      required: false,
      notes: 'Optional contact information'
    },
    {
      name: 'Captcha',
      required: false,
      notes: 'Can be enabled for security'
    }
  ],
  matchingOptions: [
    {
      title: 'No Matching',
      description: 'Do not match the ticket to a user record. Requestor information will be entered as read-only text in the new ticket.',
    },
    {
      title: 'Match Only',
      description: 'Match using Email Address. If no requestor is found, enter requestor information as read-only text in the new ticket.',
    },
    {
      title: 'Match and Create',
      description: 'Match using Email Address. If no requestor is found, create a new requestor and associate that record to the new ticket.',
      note: 'With this option, the first time they make a request their user record will be created. Any future tickets will automatically match to their user record, allowing you to see their full history.'
    }
  ]
}; 