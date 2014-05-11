/**
 * This jQuery plugin is an extension of the Bootstrap3 alert.
 * author: Luyao Zhao
   setup: 
   usage:
 */

(function ($, window, document) {
    var centerIt = function (elemId) {
        var $elem = $("#" + elemId);
        $elem.css("left", Math.max(0, (($(window).width() - $elem.outerWidth()) / 2) + $(window).scrollLeft()) + "px");
        return this;
    };
    var options = {};
    // Defaults
    $.fn.alert = function (methodOrOptions) {
        $.fn.alert.init();
        var self = this;
        self._beforealert = function () {
            centerIt("notificationArea");
            var diff = $("#" + options.alertsHolderId + " .alert:visible").size() - options.maxAlertSize;
            if (diff >= 0) {
                for (var i = 0; i <= diff; i++) {
                    $("#" + options.alertsHolderId + " .alert:visible").eq(i).addClass("hidden").hide();
                }
            }
        };
        self._afteralert = function () {
            if ($("#" + options.alertsHolderId + " .alert:visible").size() == 0) {
                $("#" + options.alertsHolderId).css("z-index", -100000);
            }
        };
        var _templates = {
            error: '<span class="alert alert-danger hidden vertical-center-wrapper"></span>',
            warning: '<span class="alert alert-warning  hidden vertical-center-wrapper"></span>',
            info: '<span class="alert alert-info  hidden vertical-center-wrapper"></span>',
            success: '<span class="alert alert-success  hidden vertical-center-wrapper"></span>',
        };
        var _getAlertContentHTML = function (type, msg, extraData) {
            var contentHtml = "<i class='alert-icon alert-" + type + "-ss vertical-center'></i><p class='vertical-center alert-msg'>" + msg + "</p>";
            return contentHtml;
        };
        var _createAlert = function (msgType, contentHtml) {
            $("#" + options.alertsHolderId).css("z-index", options.zIndex);
            var $alert = $(_templates[msgType]).append(contentHtml).dblclick(function () {
                $(this).remove();
                self._afteralert();
            });
            $alert.bind('closed.bs.alert', function () {
                $(this).remove();
                console.debug("closed.bs.alert");
                self._afteralert();
            });

            $alert.appendTo("#" + options.alertsHolderId).removeClass("hidden").fadeIn(options.fadeInDuration).delay(options.delayDuration).fadeOut(options.fadeOutDuration, function () {
                $(this).remove();
                self._afteralert();
            });
        };
        var _methods = {
            info: function (msg, extraData) {
                var msgType = "info";
                var contentHtml = _getAlertContentHTML(msgType, msg, extraData);
                _createAlert(msgType, contentHtml);
            },
            error: function (msg, extraData) {
                var msgType = "error";
                var contentHtml = _getAlertContentHTML(msgType, msg, extraData);
                _createAlert(msgType, contentHtml);
            },
            warning: function (msg, extraData) {
                var msgType = "warning";
                var contentHtml = _getAlertContentHTML(msgType, msg, extraData);
                _createAlert(msgType, contentHtml);
            },
            success: function (msg, extraData) {
                var msgType = "success";
                var contentHtml = _getAlertContentHTML(msgType, msg, extraData);
                _createAlert(msgType, contentHtml);
            }
        };
        if (_methods[methodOrOptions]) {
            self._beforealert();
            return _methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1), Array.prototype.slice.call(arguments, 2), Array.prototype.slice.call(arguments, 3));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            // Default to "init"
            return _methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.alert');
        }
    };
    $.fn.alert.init = function (customOptions) {
        // Ensure that only one "alert" exists
        if (!$.data(document.body, 'alert')) {
            $.data(document.body, 'alert', true);
            // Apply any options to the settings, override the defaults
            options = $.fn.alert.settings = $.extend({}, $.fn.alert.defaults, customOptions);
            // Create element
            var $self = $('<div id= "' + options.alertsHolderId + '"class="navbar navbar-fixed-top text-center"></div>').appendTo('body');
            // Minimum CSS to make the magic happen
            $self.css({
                'top': options.topOffset,
                'z-index': '-10',
                'position': 'fixed'
            });
        }
    };
    $.fn.alert.defaults = {
        alertsHolderId: 'notificationArea', // Element ID
        dismissable: true,
        delayDuration: 50000, // The number of milliseconds to delay the fadeout of alerts
        fadeInDuration: 400, // determining how long the animation will run
        fadeOutDuration: 400, // determining how long the animation will run
        easingType: 'linear', // show/hide easing (see http://easings.net/)
        animation: 'fade', // Fade, slide, none
        zIndex: 900, // Z-Index for the overlay,
        topOffset: "60px",
        maxAlertSize: 3
    };
    $.alert = $.fn.alert;
    $.alert.init = $.fn.alert.init;

})(jQuery, window, document);