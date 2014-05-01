$(function() {
    var
        coupons = [
            "Redeemable for one flowering plant, grown to your specifications",
            "Redeemable for one undisturbed morning of rest",
            "Redeemable for one candlelight supper on the balcony",
            "Redeemable for one visit to In 'n Out",
            "Redeemable for one picnic on campus with a bottle of wine, cheese, and our picnic basket"
        ]
    ;

    $('.coupon').click(function() {
        var $this = $(this);

        if ($this.data('date') <= Date.now()) {
            $this.text(coupons[$this.data('idx')]);
            $this.find('.cover').css('opacity', 0);
        } else {
            alert('No cheating!');
        }
    });
});
