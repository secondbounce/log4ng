import { Level } from './level';

export class LoggingEvent {
  public level: Level;
  public loggerName: string;
  public message: string;
  public exception: Error;
  public readonly timestamp: number = Date.now();


// Public field	Domain	    // String representation of the AppDomain.
// Public field	ExceptionString	    // The string representation of the exception
// Public field	Identity	    // String representation of the identity.
// Public field	Level	    // Level of logging event.
// Public field	LocationInfo	    // Location information for the caller.
// Public field	LoggerName	    // The logger name.
// Public field	Message	    // The application supplied message.
// Public field	Properties	    // Additional event specific properties
// Public field	ThreadName	    // The name of thread
// Public field	UserName	    // String representation of the user



// Public property	Domain    // Gets the AppDomain friendly name.
// Public property	Fix   // The fixed fields in this event
// Public property	Identity    // Gets the identity of the current thread principal.
// Public property	LocationInformation   // Gets the location information for this logging event.
// Public property	MessageObject   // Gets the message object used to initialize this event.
// Public property	Properties    // Additional event specific properties.
// Public property	RenderedMessage   // Gets the message, rendered through the RendererMap.
// Public property	Repository    // The ILoggerRepository that this event was created in.
// Public propertyStatic member	StartTime   // Gets the time when the current process started.
// Public propertyStatic member	StartTimeUtc    // Gets the UTC time when the current process started.
// Public property	ThreadName    // Gets the name of the current thread.
// Public property	TimeStamp   // Gets the time of the logging event.
// Public property	UserName    // Gets the name of the current user.
}
