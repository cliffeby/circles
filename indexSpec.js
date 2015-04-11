/**
 * Created by EbyC on 4/11/2015.
 */
describe('Controller: MainCtrl', function () {
    beforeEach(module('circles'));

    var ctrl;
    var vm = this;

    beforeEach(inject(function($controller){
        ctrl = $controller('MainCtrl')
    }));

    it('should have the following items defined onload',function(){
        expect(ctrl.submit.dotSize).toEqual(
            30
        )
    });
});