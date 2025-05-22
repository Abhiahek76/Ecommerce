const verifyTemplate = ({ name, url }) => `
  <div>
    <h1>Hello ${name},</h1>
    <p>Please verify your email by clicking the link below:</p>
    <a href="${url}">Verify Email</a>
  </div>
`;

export default verifyTemplate;
