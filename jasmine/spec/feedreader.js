/* global expect, allFeeds, entries */
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* === This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.===
     */
    describe('RSS Feeds', function () {
        /* Test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();   // All feeds defined
            expect(allFeeds.length).not.toBe(0);  // Make sure allfeeds is not empty
        });


        /* Loop through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('must have a valid URL', function () {
            for (var id in allFeeds) {
                expect(allFeeds[id].url).toBeDefined();                 // URL is defined
                expect(allFeeds[id].url.length).not.toBe(0);                    // URL is not empty
                expect(allFeeds[id].url.indexOf("http://")).toBe(0);    // URL starts with http://
            }
        });


        /* Loop through each feed
         * in the allFeeds object and ensure it has a name defined
         * and that the name is not empty.
         */
        it('must have a name', function () {
            for (var id in allFeeds) {
                expect(allFeeds[id].name).toBeDefined();    // Name is defined
                expect(allFeeds[id].name.length).not.toBe(0);       // Name is not empty
            }
        });
    });


    /* === test suite named "The menu" === */
    describe('The menu', function () {

        /* Ensure the menu element is
         * hidden by default. "menu-hidden" hides the menu and is toggled when user clicks
         */
        it('must be hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);  // If menu-hidden is present then menu is hidden
        });

        /* Ensure the menu changes
         * visibility when the menu icon is clicked. 
         * Tests both: 1. does the menu display when
         * clicked and 2. does it hide when clicked again.
         */
        it('must change when menu clicked', function () {
            menu = $('.menu-icon-link');

            // Click on menu
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);   // Make sure menu is not hidden

            // Click again 
            menu.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);   // Make sure menu is now hidden
        });
    });

    /* === test suite named "Initial Entries" === */
    describe('Initial Entries', function () {

        /* TODO: Ensure that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test uses
         * Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            // Loadfeed 0 and wait for it to complete
            loadFeed(0, function () {
                done();
            });
        });

        it('must create at least a single .entry', function (done) {
                // Verify that there is now an entry link
            expect($('.entry-link').length).toBeGreaterThan(0);
            done();
        });
    });

    /* === test suite named "New Feed Selection ==="*/
    describe('New Feed Selection', function () {
        var oldHeadlines, newHeadlines;
        /* Ensure that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Uses "done", since loadFeed() is asynchronous.
         */
        beforeEach(function (done) {
            // Save original headlines - from H2 tags
            oldHeadlines = $('H2').text();
            // Load new headlines and wait for completion
            loadFeed(1, function () {
                done();
            });
        });

        it('must change content', function (done) {
            // Save new headlines
            newHeadlines = $('H2').text();
            
            // Verify that new headlines don't match old headlines
            expect(newHeadlines).not.toBe(oldHeadlines);
            done();
        });
    });
}());