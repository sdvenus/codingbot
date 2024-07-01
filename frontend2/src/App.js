import "./App.css";
import Bot from "./components/bot";

function App() {
  return (
    <div className="App">
      {/* Video tag to embed the background video */}
      <video autoPlay loop muted className="background-video">
        <source src="/style/coding.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Bot />
    </div>
  );
}

export default App;
