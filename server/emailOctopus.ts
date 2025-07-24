export async function addToEmailOctopus(email: string, firstName: string = '') {
  const apiKey = process.env.EMAIL_OCTOPUS_API_KEY;
  const listId = process.env.EMAIL_OCTOPUS_LIST_ID; // You'll need to add this secret too

  if (!apiKey || !listId) {
    console.log('Email Octopus not configured, skipping...');
    return;
  }

  try {
    const response = await fetch(`https://emailoctopus.com/api/1.6/lists/${listId}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        email_address: email,
        fields: {
          FirstName: firstName
        },
        status: 'SUBSCRIBED'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Email Octopus error:', error);
    } else {
      console.log('Successfully added to Email Octopus:', email);
    }
  } catch (error) {
    console.error('Email Octopus integration error:', error);
  }
}