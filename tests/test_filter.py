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
        button = self.page.locator("#filter-button")
        container = self.page.locator("#filter-container")

        # check if the container is hidden. At this point it shouldn't
        self.assertFalse(container.is_visible())

        button.click()
        self.page.wait_for_timeout(1100)

        # check if the container is visible
        self.assertTrue(container.is_visible())

        # close and reopen
        button.click()
        self.page.wait_for_timeout(1100)
        self.assertFalse(container.is_visible())
        button.click()
        self.page.wait_for_timeout(1100)
        self.assertTrue(container.is_visible())

    def testSearch(self) -> None:
        button = self.page.locator("#filter-button")
        container = self.page.locator("#filter-container")

        if not container.is_visible():
            button.click()
            self.page.wait_for_timeout(1100)

        searchBox = self.page.locator("#filter-container #search-box")
        menu = self.page.locator("#menu-items-container")

        searchBox.fill("capri")
        self.assertIn("Capricciosa", menu.all_inner_texts()[0])

        searchBox.fill("waii")
        self.assertIn("Hawaii", menu.all_inner_texts()[0])

        searchBox.fill("MARGARITA")
        self.assertIn("Margarita", menu.all_inner_texts()[0])

    def testCheckboxes(self) -> None:
        button = self.page.locator("#filter-button")
        container = self.page.locator("#filter-container")

        if not container.is_visible():
            button.click()
            self.page.wait_for_timeout(1100)

        menu = self.page.locator("#menu-items-container")

        vegetarianCheckbox = self.page.locator("#filter-container #Vegetarisk")
        vegetarianCheckbox.click()
        self.assertIn("Margarita", menu.all_inner_texts()[0])
        self.assertNotIn("Hawaii", menu.all_inner_texts()[0])
        # Uncheck to make sure it works
        vegetarianCheckbox.click()
        self.assertIn("Margarita", menu.all_inner_texts()[0])
        self.assertIn("Hawaii", menu.all_inner_texts()[0])

        hamCheckbox = self.page.locator("#filter-container #Skinka")
        hamCheckbox.click()
        self.assertNotIn("Hawaii", menu.all_inner_texts()[0])
        self.assertIn("Margarita", menu.all_inner_texts()[0])
        # Uncheck to make sure it works
        hamCheckbox.click()
        self.assertIn("Hawaii", menu.all_inner_texts()[0])
        self.assertIn("Margarita", menu.all_inner_texts()[0])
        self.assertIn("Capricciosa", menu.all_inner_texts()[0])

    def testPriceRange(self) -> None:
        button = self.page.locator("#filter-button")
        container = self.page.locator("#filter-container")

        if not container.is_visible():
            button.click()
            self.page.wait_for_timeout(1100)

        menu = self.page.locator("#menu-items-container")
        priceSliderSelector = "#price-range"

        minPrice = 80
        maxPrice = 95
        
        # Set the price to the lowest possible and see if the correct result appears
        self.page.evaluate(f'document.querySelector("{priceSliderSelector}").noUiSlider.set(["{minPrice}", {minPrice}]);')
        self.page.evaluate("updateFilters()")
        self.assertIn("Margarita", menu.all_inner_texts()[0])
        self.assertNotIn("Hawaii", menu.all_inner_texts()[0])
        self.assertNotIn("La Casa", menu.all_inner_texts()[0])

        # Set the price to the highest possible and see if the correct result appears
        self.page.evaluate(f'document.querySelector("{priceSliderSelector}").noUiSlider.set(["{minPrice}", {maxPrice}]);')
        self.page.evaluate("updateFilters()")
        self.assertIn("Margarita", menu.all_inner_texts()[0])
        self.assertIn("Hawaii", menu.all_inner_texts()[0])
        self.assertIn("La Casa", menu.all_inner_texts()[0])
        self.assertIn("Pompeii", menu.all_inner_texts()[0])

        # Set the price between 86 and 89 (should not find any results)
        self.page.evaluate(f'document.querySelector("{priceSliderSelector}").noUiSlider.set(["{86}", {89}]);')
        self.page.evaluate("updateFilters()")
        self.assertIn('Inga pizzor matchar din sökning', menu.all_inner_texts()[0])

    def testNoResult(self) -> None:
        button = self.page.locator("#filter-button")
        container = self.page.locator("#filter-container")

        if not container.is_visible():
            button.click()
            self.page.wait_for_timeout(1100)
        
        menu = self.page.locator("#menu-items-container")
        veggie = self.page.locator("#filter-container #Vegetarisk")
        calzone = self.page.locator("#filter-container #Inbakad")

        # This should not give any results
        veggie.click()
        calzone.click()

        # Check if it says that there are no results
        self.assertIn('Inga pizzor matchar din sökning', menu.all_inner_texts()[0])

        # Uncheck the veggie filter, this should show the margarita pizza
        calzone.click()

        self.assertNotIn('Inga pizzor matchar din sökning', menu.all_inner_texts()[0])

        self.assertIn("Margarita", menu.all_inner_texts()[0])


if __name__ == "__main__":
    unittest.main(verbosity=2)
