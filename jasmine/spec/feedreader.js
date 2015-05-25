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
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('must have a valid URL', function () {
            for (var id in allFeeds) {
                expect(allFeeds[id].url).toBeDefined();
                expect(allFeeds[id].url).length > 0;
                expect(allFeeds[id].url.indexOf("http://")).toBe(0);
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('must have a name', function () {
            for (var id in allFeeds) {
                expect(allFeeds[id].name).toBeDefined();
                expect(allFeeds[id].name).length > 0;
            }
        });

    });


    /* === test suite named "The menu" === */
    describe('The menu', function () {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('must be hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('must change when menu clicked', function () {
            menu = $('.menu-icon-link');

            menu.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            menu.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* === test suite named "Initial Entries" === */
    describe('Initial Entries', function () {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('must create at least a single .entry', function (done) {
            expect($('.entry-link').length).toBeGreaterThan(0);
            done();
        });
    });

    /* === test suite named "New Feed Selection ==="*/
    describe('New Feed Selection', function () {
        var oldHeadlines, newHeadlines;
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
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
            newHeadlines = $('H2').text();
            expect(newHeadlines).not.toBe(oldHeadlines);
            done();
        });
    });
}());