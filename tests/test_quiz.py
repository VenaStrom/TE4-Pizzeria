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
        self.assertIn("Om du fick superkrafter, vad skulle du göra?", question.inner_text())
        for _ in range(3):
            radioBox1.click()
            self.page.wait_for_timeout(1000)
        self.assertIn("Om du var osynlig i en timme, vad skulle du göra?", question.inner_text())
        for _ in range(3):
            radioBox1.click()
            self.page.wait_for_timeout(1000)
        self.assertIn("Om du fick en tidsmaskin, var skulle du resa?", question.inner_text())

    def testQuizAnswers(self) -> None:
        radioBox1 = self.page.locator("#radioBox0")
        firstAnswer = self.page.locator("#answer0")
        lastAnswer = self.page.locator("#answer3")	
        self.assertIn("Flyga", firstAnswer.inner_text())
        self.assertIn("Hjälpa andra", lastAnswer.inner_text())

        for _ in range(3):
            radioBox1.click()
            self.page.wait_for_timeout(1000)
        self.assertIn("Tjuvlyssna på samtal", firstAnswer.inner_text())
        self.assertIn("Göra spratt på folk", lastAnswer.inner_text())

        for _ in range(3):
            radioBox1.click()
            self.page.wait_for_timeout(1000)
        self.assertIn("En lugn plats i historien", firstAnswer.inner_text())
        self.assertIn("En tid då jag var äldre", lastAnswer.inner_text())



    def testQuizResult(self) -> None:
        quizContainer =  self.page.locator("#quiz-container",)
        radioBox1 = self.page.locator("#radioBox0")

        # Jump to last question and answer it
        self.page.evaluate("questionIndex = 6")
        radioBox1.click()
        
        self.page.wait_for_timeout(1000)

        self.assertIn("Din pizza är...", quizContainer.inner_text())
        self.assertNotIn("undefined", quizContainer.inner_text())
        self.assertNotIn("[object Object]", quizContainer.inner_text())



if __name__ == "__main__":
    unittest.main(verbosity=2)
