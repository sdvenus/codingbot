import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import "../style/bot.css";
import pythonLogo from '../style/images/python-logo.png';
import javascriptLogo from '../style/images/javascript-logo.png';
import javaLogo from '../style/images/java-logo.png';
import cppLogo from '../style/images/cmas-logo.png';
import csharpLogo from '../style/images/csharp-logo.png';
import phpLogo from '../style/images/php-logo.png';
import typescriptLogo from '../style/images/typescript-logo.png';
import rubyLogo from '../style/images/ruby-logo.png';
import swiftLogo from '../style/images/swift-logo.png';
import goLogo from '../style/images/go-logo.png';
import rustLogo from '../style/images/rust-logo.png';
import kotlinLogo from '../style/images/kotlin-logo.png';
import perlLogo from '../style/images/perl-logo.png';
import rLogo from '../style/images/r-logo.png';
import matlabLogo from '../style/images/matlab-logo.png';
import haskellLogo from '../style/images/haskell-logo.png';
import luaLogo from '../style/images/lua-logo.png';
import scalaLogo from '../style/images/scala-logo.png';
import dartLogo from '../style/images/dart-logo.png';
import assemblyLogo from '../style/images/assembly-logo.png';


const Bot = () => {
  const [task, setTask] = useState('');
  const [language, setLanguage] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formVisible, setFormVisible] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  // Define array of programming languages
  const languages = [
    { id: 1, name: 'Python', logo: pythonLogo },
    { id: 2, name: 'JavaScript', logo: javascriptLogo },
    { id: 3, name: 'Java', logo: javaLogo },
    { id: 4, name: 'C++', logo: cppLogo },
    { id: 5, name: 'C#', logo: csharpLogo },
    { id: 6, name: 'PHP', logo: phpLogo },
    { id: 7, name: 'TypeScript', logo: typescriptLogo },
    { id: 8, name: 'Ruby', logo: rubyLogo },
    { id: 9, name: 'Swift', logo: swiftLogo },
    { id: 10, name: 'Go', logo: goLogo },
    { id: 11, name: 'Rust', logo: rustLogo },
    { id: 12, name: 'Kotlin', logo: kotlinLogo },
    { id: 13, name: 'Perl', logo: perlLogo },
    { id: 14, name: 'R', logo: rLogo },
    { id: 15, name: 'Matlab', logo: matlabLogo },
    { id: 16, name: 'Haskell', logo: haskellLogo },
    { id: 17, name: 'Lua', logo: luaLogo },
    { id: 18, name: 'Scala', logo: scalaLogo },
    { id: 19, name: 'Dart', logo: dartLogo },
    { id: 20, name: 'Assembly', logo: assemblyLogo }
  ];
  
  
  const handleLanguageSelect = (lang) => {
    setLanguage(lang.name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (handleLanguageSelect && task) {
      setLoading(true);
      
      try {
        const response = await axios.post('/codebot', { task, language });
        setGeneratedCode(response.data.generated_code);
        setReview(response.data.review);
        setError('');
        setFormVisible(false); // Hide the form after submission
      } catch (error) {
        console.error('Error fetching the code and review:', error);
        setError('Failed to fetch code and review');
      }
      
      setLoading(false);
    } else {
      console.log('Language and Task are required.');
      setError('Language and Task are required.');
  
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError('');
      }, 3000); // 3000 milliseconds = 3 seconds
    }
  };
  const copyCode = () => {
    // Create a temporary textarea to copy the code
    const textarea = document.createElement('textarea');
    textarea.value = generatedCode;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Code copied to clipboard!');
  };
  

  const handleReset = () => {
    setTask('');
    setLanguage('');
    setGeneratedCode('');
    setReview('');
    setFormVisible(true); // Show the form again
    setError('');
  };



  return (
    <div>
      {loading && <div className="loading-background" />}
      {formVisible ? (
        <div>
        <img
      src="/style/info.png"
      alt="Info"
      className="info-button"
      onClick={openModal}
      style={{ cursor: 'pointer' }}
    />
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Info Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <div className="modal-content">
        <p>This code generation bot is designed to assist users in producing and understanding code across various programming languages.</p>
        <p>Developed by Yessica Sosa and launched in 2024.</p>
        <button onClick={closeModal} className="modal-close-button">Close</button>
      </div>
          
    </Modal>
    </div>
      ):
      ''
      }
      <div className="bot-container">
        {formVisible ? (
          <form className="bot-form" onSubmit={handleSubmit}>
            <div>
              <label>
                <h1>Task</h1>
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="language-options">
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  className={`language-option ${language === lang.name ? 'selected' : ''}`}
                  onClick={() => handleLanguageSelect(lang)}
                >
                  <img src={lang.logo} alt={lang.name} />
                  <p>{lang.name}</p>
                </div>
              ))}
            </div>
            {!loading && (
              <img
                src="/style/play.gif"
                alt="Submit"
                onClick={handleSubmit}
                className="submit-button-image"
                style={{ cursor: 'pointer' }} // Ensure cursor changes to pointer
              />
            )}
          </form>
        ) : (
          <img
            src="/style/replay.png"
            alt="Reset"
            onClick={handleReset}
            className="buttonShow"
          />
        )}
        {error && <p className="bot-error">{error}</p>}
        {(generatedCode || review) && (
            <div className="output-container">
              {generatedCode && (
                <div className="bot-output2">
                <pre className="code-text">
                  <button className="copy-button" onClick={copyCode}>📄 Copy</button>
                  {generatedCode}
                </pre>
                <h1 className='code'>Code 🔧</h1>
              </div>              
              )}
              {review && (
                <div className="bot-output">
                  <h1 className='review'>Explanation 💡</h1>
                  <pre className="review-text">
                    {review}
                    </pre>
                </div>
              )}
            </div>
        )}
      </div>
    </div>
  );
};

export default Bot;
