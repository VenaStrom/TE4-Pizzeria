import unittest
from utils import *


class TestFilter(TemplateTest):
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

    def testOpenFiltersMenu(self) -> None:
        button = self.page.locator("#show-filters")
        container = self.page.locator("#filter-container")

        # check if the container is hidden
        self.assertFalse(container.is_visible())

        button.click()

        # check if the container is visible
        self.assertTrue(container.is_visible())

        # close and reopen
        button.click()
        self.assertFalse(container.is_visible())
        button.click()
        self.assertTrue(container.is_visible())

    def testSearch(self) -> None:
        searchBox = self.page.locator(".filter-container #search-box")
        menu = self.page.locator("#menu-items-container")

        searchBox.fill("capri")
        self.assertIn("Capricciosa", menu.all_inner_texts())

        searchBox.fill("waii")
        self.assertIn("Hawaii", menu.all_inner_texts())

        searchBox.fill("MARGHERITA")
        self.assertIn("Margherita", menu.all_inner_texts())

    def testCheckboxes(self) -> None:
        menu = self.page.locator("#menu-items-container")

        vegetarianCheckbox = self.page.locator("#filter-container #vegetarian")
        vegetarianCheckbox.click()
        self.assertIn("Margherita", menu.all_inner_texts())
        self.assertNotIn("Hawaii", menu.all_inner_texts())
        # Uncheck to make sure it works
        vegetarianCheckbox.click()
        self.assertIn("Margherita", menu.all_inner_texts())
        self.assertIn("Hawaii", menu.all_inner_texts())

        hamCheckbox = self.page.locator("#filter-container #ham")
        hamCheckbox.click()
        self.assertNotIn("Hawaii", menu.all_inner_texts())
        self.assertIn("Margherita", menu.all_inner_texts())
        # Uncheck to make sure it works
        hamCheckbox.click()
        self.assertIn("Hawaii", menu.all_inner_texts())
        self.assertIn("Margherita", menu.all_inner_texts())
        self.assertIn("Capricciosa", menu.all_inner_texts())

    def testPriceRange(self) -> None:
        menu = self.page.locator("#menu-items-container")
        priceSliderSelector = "#filter-container #price-range"

        minPrice = 80
        maxPrice = 95

        # Set the price to the lowest possible and see if the correct result appears
        self.page.evaluate(f'document.querySelector("{priceSliderSelector}").value = "{minPrice}"')
        self.assertIn("Margherita", menu.all_inner_texts())
        self.assertNotIn("Hawaii", menu.all_inner_texts())
        self.assertNotIn("La Casa", menu.all_inner_texts())

        # Set the price to the highest possible and see if the correct result appears
        self.page.evaluate(f'document.querySelector("{priceSliderSelector}").value = "{maxPrice}"')
        self.assertIn("Margherita", menu.all_inner_texts())
        self.assertIn("Hawaii", menu.all_inner_texts())
        self.assertIn("La Casa", menu.all_inner_texts())
        self.assertIn("Pompeii", menu.all_inner_texts())


if __name__ == "__main__":
    unittest.main(verbosity=2)
