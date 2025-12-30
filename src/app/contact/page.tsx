
export default function ContactPage(){
  return (
    <div className="min-h-screen">
      <h1>Contact Us</h1>
      <p>You can contact us using the following methods:</p>
      <ul>
        <li>Email: example@example.com</li>
        <li>Phone: 123-456-7890</li>
        <li>Address: 123 Main St, Anytown USA</li>
      </ul>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" /><br /><br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" /><br /><br />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message"></textarea><br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};