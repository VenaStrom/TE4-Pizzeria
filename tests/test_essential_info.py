import unittest
from utils import *


class TestEssentialInfo(TemplateTest):
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

    def testName(self) -> None:
        self.assertIn("Il Forno Magico", self.page.content())

    def testPhoneNumber(self) -> None:
        self.assertIn("tel:0630-555-555", self.page.content())
        self.assertIn("0630-555-555", self.page.content())

    def testAddress(self) -> None:
        self.assertInAll([
            "Fjällgatan 32H",
            "981 39",
            "KIRUNA",
        ], self.page.content())

    def testEmail(self) -> None:
        self.assertIn("mailto:info@ilfornomagico.se", self.page.content())
        self.assertIn("info@ilfornomagico.se", self.page.content())

    def testSocialMedia(self) -> None:
        self.assertInAll([
            "https://facebook.com/ntiuppsala",
            "https://instagram.com/ntiuppsala",
            "https://x.com/ntiuppsala",
        ], self.page.content())

    def testOpeningHours(self) -> None:
        self.assertInAll([
            "Mån-Tor",
            "10-22",
            "Fre",
            "10-23",
            "Lör",
            "12-23",
            "Sön",
            "12-20"
        ], self.page.content())


if __name__ == "__main__":
    unittest.main(verbosity=2)
