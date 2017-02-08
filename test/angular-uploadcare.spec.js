var uploadcareGlobalSettings = {
  'UPLOADCARE_PUBLIC_KEY': 'demopublickey',
  'UPLOADCARE_LIVE': true
}

describe('ng-uploadcare: ', function() {
  var $compile,
    $rootScope;

  beforeEach(function(done) {
    var scriptEl = document.createElement('script');

    for(var key in uploadcareGlobalSettings) {
      var value = uploadcareGlobalSettings[key];
      if(typeof value === 'string'){
        value = '"' + value + '"';
      }
      scriptEl.text += key + ' = ' + value + ';\r\n';
    }

    document.body.appendChild(scriptEl);
    done();
  });

  beforeEach(module('ng-uploadcare'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should add uploadcare-widget button', function() {
    var element = angular.element('<input uploadcare-widget />');
    $compile(element)($rootScope);
    $rootScope.$digest();
    expect(element.next().hasClass('uploadcare-widget')).toBe(true);
  });
});
