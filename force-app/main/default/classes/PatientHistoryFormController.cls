public class PatientHistoryFormController {
    public String selectedCountry1{get;set;}
    public String selectedCountry2{get;set;}
    
    public PatientHistoryFormController(){
        
        
    }
    
    public List<SelectOption> countrieLst {get;set;}
    public List<SelectOption> getCountriesOptions() {
        List<SelectOption> countryOptions = new List<SelectOption>();
        countrieLst.add(new SelectOption('','-None-'));
        countrieLst.add(new SelectOption('INDIA','India'));
        countrieLst.add(new SelectOption('USA','USA'));
        countrieLst.add(new SelectOption('United Kingdom','UK'));
        countrieLst.add(new SelectOption('Germany','Germany'));
        countrieLst.add(new SelectOption('Ireland','Ireland'));
        
        return countryOptions;
    }
    public PageReference save(){
        return null;
    }
    
}