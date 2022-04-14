import { LightningElement, api, track } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalendar3';
import { NavigationMixin } from 'lightning/navigation';

export default class CustomCalendar extends LightningElement {

    fullCalendarJsInitialised = false;
 
    //obejctapiname and record id to be used in the record form for my popover
   @track objectName;
   @track recId;
  
    /**
     * @description Standard lifecyle method 'renderedCallback'
     *              Ensures that the page loads and renders the 
     *              container before doing anything else
     */
    renderedCallback() {
  
      // Performs this operation only on first render
      if (this.fullCalendarJsInitialised) {
        return;
      }
      this.fullCalendarJsInitialised = true;
  
      // Executes all loadScript and loadStyle promises
      // and only resolves them once all promises are done
      Promise.all([
        loadScript(this, FullCalendarJS + '/fullcalendar-3.10.5/lib/jquery.min.js'),
        loadScript(this, FullCalendarJS + '/fullcalendar-3.10.5/lib/moment.min.js'),
        loadScript(this, FullCalendarJS + '/fullcalendar-3.10.5/fullcalendar.min.js'),
        loadScript(this, FullCalendarJS + '/fullcalendar-3.10.5/locale/fr.js'),
        loadStyle(this, FullCalendarJS + '/fullcalendar-3.10.5/fullcalendar.min.css')
      ])
      .then(() => {
        // Initialise the calendar configuration
        this.getAllEvents(); //Initialize my calendar data
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error({
          message: 'Error occured on FullCalendarJS',
          error
        });
      })
    }
  
    /**
     * @description Initialise the calendar configuration
     *              This is where we configure the available options for the calendar.
     *              This is also where we load the Events data.
     */
    initialiseFullCalendarJs() {
      const ele = this.template.querySelector('div.fullcalendarjs');
      // eslint-disable-next-line no-undef
      $(ele).fullCalendar({
        header: {
            left: 'prev,next,today',
            center: 'title',
            right: ''
        },
        themeSystem : 'standard',
        defaultDate: new Date(),
        timeZone: 'local',
        eventLimit: true,
        events: this.allEvents,
        dragScroll : false,
        editable: false,
        eventStartEditable: false,
        disableDragging: true,
        weekNumbers : true,
        eventOrder: "order",
        eventTextColor: "black",
        eventClick: this.eventClickHandler.bind(this),
        eventMouseover : this.eventMouseoverHandler.bind(this),
        eventMouseout : this.eventMouseoutHandler.bind(this),
        eventRender: this.eventRenderHandler.bind(this)
      });
    }
  
    //fired when the user clicks an event
    eventClickHandler = (event, jsEvent, view) => {
      this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: event.id,
            actionName: 'view',
        }
      });
    }
   
   //fires when the user mousesover an element
    eventMouseoverHandler = (event, jsEvent, view) => {
        this.selectedEvent = event;
        this.recId = this.selectedEvent.id;
        
        this.objectName = this.escaleObject;
    }
  
   //fires when a user mouses out the element
    eventMouseoutHandler = (event, jsEvent, view) => {
      this.selectedEvent = false;
    }
  
   //CSS adjusting
    eventRenderHandler = (event, element, view) => {
      element.css("font-size", "0.9em");
      element.css("padding", "5px");
    } 
  
    getAllEvents(){
        //Code to fetch all data, calls an apex method to query the data within my org
    }
  

}