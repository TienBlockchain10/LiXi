import { Handler } from '@netlify/functions';
import { insertWaitlistEntrySchema } from '../shared/schema';
import { storage } from '../server/storage';

export const handler: Handler = async (event) => {
  const data = JSON.parse(event.body ?? '{}');
  const validated = insertWaitlistEntrySchema.parse(data);
  const entry = await storage.createWaitlistEntry(validated);
  await addToEmailOctopus(validated.email, validated.name);
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, entry: { id: entry.id, email: entry.email } }),
  };
};
