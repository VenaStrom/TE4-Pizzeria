import unittest
from utils import *

class TestMenu(TemplateTest):
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

    def testBasicMenu(self) -> None:
        # Add a delay to ensure the menu is populated
        self.page.wait_for_timeout(500)
        
        try:
            self.assertInAll([
                "Margherita",
                "1 kr",
                "Ingenting",
                "0 kr",
                "Super Mega Ultra Deluxe Extra Large Gigantic Supremely Tasty Pizza with Everything",
                "32767 kr"
            ], self.page.content())
        except AssertionError as e:
            # Log the contents of menu-items-container
            menu_container = self.page.locator("#menu-items-container")
            print("Contents of menu-items-container:")
            print(menu_container.inner_html())
            raise e

    def testTopping(self) -> None:
        # "Extra topping" should not be in the menu, rather it should be outside of it
        menu = self.page.locator("#menu-items-container")
        self.assertNotIn("Extra topping", menu.all_inner_texts())

if __name__ == "__main__":
    unittest.main(verbosity=2)