import unittest
from utils import *


class TestQuiz(TemplateTest):
    def setUp(self) -> None:
        super().setUp(fileToTest="index.html")

    def doesBrowserExist(self) -> None:
        self.assertIsNotNone(self.page)

    def doesPageExist(self) -> None:
        self.assertEqual("complete", self.page.evaluate("document.readyState"))

    def doesNameExist(self) -> None:
        if (self.__class__.__name__ == "TestName"):
            self.fail("Test class name is not set. Please change")
            
    def testSelf(self) -> None:
        self.doesBrowserExist()
        self.doesPageExist()
        self.doesNameExist()
 
    # new test function goes here
    def testQuizContainer(self) -> None:
        quizContainer =  self.page.locator("#quiz-container", timeout=1000)
        self.assertTrue(quizContainer.is_visible())

    def testQuizRadioBox(self) -> None:
        radioBox1 = self.page.locator("#quiz-container input[type='radio']:nth-of-type(1)", timeout=1000)
        radioBox2 = self.page.locator("#quiz-container input[type='radio']:nth-of-type(2)", timeout=1000)
        self.assertTrue(radioBox1.is_visible())
        radioBox1.click(timeout=1000)
        self.assertTrue(radioBox1.is_checked())
        self.assertFalse(radioBox2.is_checked())
        radioBox2.click(timeout=1000)
        self.assertTrue(radioBox2.is_checked())
        self.assertFalse(radioBox1.is_checked())

    def testQuizQuestion(self) -> None:
        radioBox1 = self.page.locator("#quiz-container input[type='radio']:nth-of-type(1)", timeout=1000)
        question = self.page.locator("#question", timeout=1000)
        self.assertIn("Om du fick superkrafter för en dag, vad skulle du göra?", question.inner_text())
        for _ in range(3): self.click(radioBox1, timeout=1000)
        self.assertIn("Om du fick vara osynlig i en timme, vad skulle du göra?", question.inner_text())
        for _ in range(3): self.click(radioBox1, timeout=1000)
        self.assertIn("Om du fick en tidsmaskin, var skulle du resa?", question.inner_text())

    def testQuizAnswers(self) -> None:
        radioBox1 = self.page.locator("#quiz-container input[type='radio']:nth-of-type(1)", timeout=1000)
        answer = self.page.locator("#answer", timeout=1000)
        self.assertIn("Använda mina krafter för att ta det lugnt och flyga till en plats utan stress", answer.inner_text())
        self.assertIn("Göra världen till en roligare plats med massor av tropiska drinkar och sol", answer.inner_text())

        for _ in range(3): self.click(radioBox1, timeout=1000)
        self.assertIn("Tjuvlyssna på hemliga samtal och sen ta en tupplur", answer.inner_text())
        self.assertIn("Göra massor av spratt på folk och sedan springa iväg skrattandes", answer.inner_text())

        for _ in range(3): self.click(radioBox1, timeout=1000)
        self.assertIn("Till en lugn plats i historien där jag bara kan njuta av dagen", answer.inner_text())
        self.assertIn("Till en tropisk ö för att leva det perfekta semesterlivet", answer.inner_text())



    def testQuizResult(self) -> None:
        result = self.page.locator("#quizResult", timeout=1000)
        self.assertTrue(result.is_visible())
        self.assertIn("Enligt dina svar är du en", result.inner_text())
        self.assertNotIn("undefined", result.inner_text())



if __name__ == "__main__":
    unittest.main(verbosity=2)
