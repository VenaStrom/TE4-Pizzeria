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

        searchBox.fill("Ingen")
        self.assertIn("Ingenting", menu.all_inner_texts()[0])

        searchBox.fill("plaim")
        self.assertIn("Plain Pizza", menu.all_inner_texts()[0])

    def testCheckboxes(self) -> None:
        button = self.page.locator("#filter-button")
        container = self.page.locator("#filter-container")

        if not container.is_visible():
            button.click()
            self.page.wait_for_timeout(1100)

        menu = self.page.locator("#menu-items-container")


        # 
        # Special options
        # 
        vegetarianCheckbox = self.page.locator("#filter-container #special-option1")
        calzoneCheckbox = self.page.locator("#filter-container #special-option2")
        
        # Only get veggie pizzas
        vegetarianCheckbox.click()
        self.assertIn("Vegetarisk", menu.all_inner_texts()[0])
        self.assertIn("Inbakad och vegetarisk", menu.all_inner_texts()[0])
        self.assertNotIn("Inbakad\n", menu.all_inner_texts()[0])

        # Uncheck to make sure it resets
        vegetarianCheckbox.click()
        self.assertIn("Super Mega Ultra Deluxe Extra Large Gigantic Supremely Tasty Pizza with Everything", menu.all_inner_texts()[0])

        # Only get pizzas that are calzones as well as vegetarian
        vegetarianCheckbox.click()
        calzoneCheckbox.click()
        self.assertIn("Inbakad och vegetarisk", menu.all_inner_texts()[0])
        self.assertNotIn("Vegetarisk", menu.all_inner_texts()[0])
        self.assertNotIn("Inbakad\n", menu.all_inner_texts()[0])
        
        # Reset
        vegetarianCheckbox.click()
        calzoneCheckbox.click()
        
        # 
        # Ingredients
        # 
        tomatoCheckbox = self.page.locator("#filter-container #ingredient1")
        hamCheckbox = self.page.locator("#filter-container #ingredient2")
        cheeseCheckbox = self.page.locator("#filter-container #ingredient3")

        tomatoCheckbox.click()
        hamCheckbox.click()
        cheeseCheckbox.click()
        
        self.assertNotIn("Margherita", menu.all_inner_texts()[0])
        self.assertNotIn("Plain Pizza", menu.all_inner_texts()[0])
        self.assertIn("Ingenting", menu.all_inner_texts()[0])
        self.assertIn("Vegetarisk", menu.all_inner_texts()[0])

    def testPriceRange(self) -> None:
        button = self.page.locator("#filter-button")
        container = self.page.locator("#filter-container")

        if not container.is_visible():
            button.click()
            self.page.wait_for_timeout(1100)

        menu = self.page.locator("#menu-items-container")
        priceSliderSelector = "#price-range"

        minPrice = 0
        maxPrice = 32767

        # Set the price to the lowest possible
        self.page.evaluate(f'document.querySelector("{priceSliderSelector}").noUiSlider.set(["{minPrice}", {minPrice}]);')
        self.page.evaluate("updateFilters()")
        self.assertIn("Ingenting", menu.all_inner_texts()[0])
        self.assertNotIn("Margherita", menu.all_inner_texts()[0])
        self.assertNotIn("Super Mega Ultra Deluxe Extra Large Gigantic Supremely Tasty Pizza with Everything", menu.all_inner_texts()[0])

        # Set the price to the entire range
        self.page.evaluate(f'document.querySelector("{priceSliderSelector}").noUiSlider.set(["{minPrice}", {maxPrice}]);')
        self.page.evaluate("updateFilters()")
        self.assertIn("Margherita", menu.all_inner_texts()[0])
        self.assertIn("Ingenting", menu.all_inner_texts()[0])
        self.assertIn("Vegetarisk", menu.all_inner_texts()[0])

        # Set the price to the highest possible
        self.page.evaluate(f'document.querySelector("{priceSliderSelector}").noUiSlider.set(["{maxPrice}", {maxPrice}]);')
        self.page.evaluate("updateFilters()")

        # Set the price between 5433 and 7844 
        # we don't expect to find anything
        self.page.evaluate(f'document.querySelector("{priceSliderSelector}").noUiSlider.set(["{5433}", {7844}]);')
        self.page.evaluate("updateFilters()")
        self.assertNotIn("Margherita", menu.all_inner_texts()[0])
        self.assertNotIn("Super Mega Ultra Deluxe Extra Large Gigantic Supremely Tasty Pizza with Everything", menu.all_inner_texts()[0])
        self.assertNotIn("Ingenting", menu.all_inner_texts()[0])
        self.assertNotIn("Vegetarisk", menu.all_inner_texts()[0])
        self.assertIn("Inga pizzor matchar din sökning", menu.all_inner_texts()[0])

    def testNoResult(self) -> None:
        button = self.page.locator("#filter-button")
        container = self.page.locator("#filter-container")

        if not container.is_visible():
            button.click()
            self.page.wait_for_timeout(1100)

        menu = self.page.locator("#menu-items-container")
        search = self.page.locator("#filter-container #search-box")
      
        # This should not give any results
        search.fill("sdfgh")

        # Check if it says that there are no results
        self.assertIn("Inga pizzor matchar din sökning", menu.all_inner_texts()[0])

if __name__ == "__main__":
    unittest.main(verbosity=2)
