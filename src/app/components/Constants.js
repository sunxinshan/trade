
// define the parameter for further refacotring:
// current implemnet is for each rail have it's own page, and fetch it's owned data with specified uri, e.g. /xendit/fxrates
// and this constant is used to identify rail information, in future, client side shold not aware the rail difference but the
// translation will be done in node server side
export const XENDIT_RAIL_NAME = "xendit"
