import { Configuration, OpenAIApi } from "openai";

interface CustomError extends Error {
  response?: {
    status: number;
    data: any;
  };
}
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const correctSentence = async (body: string) => {
  const prompt = `
  You are provided with a sentence. Please fix the grammar and add proper punctuations.
  
  The email is delimited with triple quotes. Respond only with the corrected version without repeating the original sentence`;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 2000,
      prompt: `${prompt}\nSentence:"""${body}"""`,
    });

    return completion;
  } catch (error) {
    const customError = error as CustomError;
    if (customError.response) {
      console.log(customError.response.status);
      console.log(customError.response.data);
    } else {
      console.log(customError.message);
    }
  }
};

export { correctSentence };
