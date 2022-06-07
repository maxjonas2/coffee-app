export default function ExampleDialog() {
  return (
    <div className="dialog">
      <h2>Dialog Content</h2>
      <p>This is some dialog content</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <button onClick={() => setDialog(null)}>Close</button>
    </div>
  );
}
