import { useState, useEffect } from "react";

const useTypewriter = (
  texts: string[],
  typingSpeed: number = 100,
  delayBetweenTexts: number = 1000
) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: number;
    
    if (isDeleting) {
      timer = window.setTimeout(() => {
        setDisplayText(texts[currentIndex].substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        
        if (charIndex <= 1) {
          setIsDeleting(false);
          setCurrentIndex(prev => (prev + 1) % texts.length);
          // Delay before typing the next word
          timer = window.setTimeout(() => {
            setCharIndex(0);
          }, delayBetweenTexts / 2);
        }
      }, typingSpeed / 2);
    } else {
      timer = window.setTimeout(() => {
        setDisplayText(texts[currentIndex].substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        
        if (charIndex >= texts[currentIndex].length) {
          // Delay before starting to delete
          timer = window.setTimeout(() => {
            setIsDeleting(true);
          }, delayBetweenTexts);
        }
      }, typingSpeed);
    }
    
    return () => clearTimeout(timer);
  }, [charIndex, currentIndex, isDeleting, texts, typingSpeed, delayBetweenTexts]);

  return displayText;
};

export default useTypewriter;
