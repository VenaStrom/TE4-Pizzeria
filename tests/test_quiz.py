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
        quizContainer =  self.page.locator("#quiz-container",)
        self.assertTrue(quizContainer.is_visible())

    def testQuizRadioBox(self) -> None:
        radioBox1 = self.page.locator("#radioBox0")
        radioBox2 = self.page.locator("#radioBox3")
        
        # Check if elements are found
        self.assertIsNotNone(radioBox1)
        self.assertIsNotNone(radioBox2)
        
        # Check visibility
        self.assertTrue(radioBox1.is_visible())
        self.assertTrue(radioBox2.is_visible())
        
        # Click the first radio button and check its state
        radioBox1.click(timeout=1000)
        self.assertTrue(radioBox1.is_checked())
        self.assertFalse(radioBox2.is_checked())
        
        # Click the second radio button and check its state
        radioBox2.click(timeout=1000)
        self.assertTrue(radioBox2.is_checked())
        self.assertFalse(radioBox1.is_checked())

    def testQuizQuestion(self) -> None:
        radioBox1 = self.page.locator("#radioBox0")
        question = self.page.locator("#question")
        self.assertIn("Om du fick superkrafter för en dag, vad skulle du göra?", question.inner_text())
        for _ in range(3):
            radioBox1.click()
            self.page.wait_for_timeout(500)
        self.assertIn("Om du fick vara osynlig i en timme, vad skulle du göra?", question.inner_text())
        for _ in range(3):
            radioBox1.click()
            self.page.wait_for_timeout(500)
        self.assertIn("Om du fick en tidsmaskin, var skulle du resa?", question.inner_text())

    def testQuizAnswers(self) -> None:
        radioBox1 = self.page.locator("#radioBox0")
        firstAnswer = self.page.locator("#answer0")
        lastAnswer = self.page.locator("#answer3")	
        self.assertIn("Använda mina krafter för att ta det lugnt och flyga till en plats utan stress", firstAnswer.inner_text())
        self.assertIn("Göra världen till en roligare plats med massor av tropiska drinkar och sol", lastAnswer.inner_text())

        for _ in range(3):
            radioBox1.click()
            self.page.wait_for_timeout(500)
        self.assertIn("Tjuvlyssna på hemliga samtal och sen ta en tupplur", firstAnswer.inner_text())
        self.assertIn("Göra massor av spratt på folk och sedan springa iväg skrattandes", lastAnswer.inner_text())

        for _ in range(3):
            radioBox1.click()
            self.page.wait_for_timeout(500)
        self.assertIn("Till en lugn plats i historien där jag bara kan njuta av dagen", firstAnswer.inner_text())
        self.assertIn("Till en tropisk ö för att leva det perfekta semesterlivet", lastAnswer.inner_text())



    def testQuizResult(self) -> None:
        result = self.page.locator("#quizResult")
        self.assertTrue(result.is_visible())
        self.assertIn("Enligt dina svar är du en", result.inner_text())
        self.assertNotIn("undefined", result.inner_text())



if __name__ == "__main__":
    unittest.main(verbosity=2)
