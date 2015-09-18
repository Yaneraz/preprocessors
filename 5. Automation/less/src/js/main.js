var mainJs = new MainJsClass();

function MainJsClass() {
    var scope = this;

    this.commonFeatures = function () {

    };

    $(function(){
       scope.commonFeatures();
    });
}