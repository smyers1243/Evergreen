#include "apachetools.h"
#include "xmltools.h"

#define MODULE_NAME		"mod_xmltools" /* our module name */
#define PARAM_LOCALE		"locale"			/* the URL param for the local directory */
#define LANG_DTD			"lang.dtd"		/* the DTD for the test entities */



/* ------------------------------------------------------------------------------ */
/* Apache config items.  These are defaults which are only  used if they are not
	overriden by the Apache config or URL where appropriate */
/* ------------------------------------------------------------------------------ */
/* The default directory where the local files are stored */
#define DEFAULT_LOCALE_DIR		"/openils/var/locale"
#define DEFAULT_LOCALE			"en-US"			
/* ------------------------------------------------------------------------------ */


/* This module */
module AP_MODULE_DECLARE_DATA mod_xmltools;


/* our config structure */
typedef struct {
	/* directory on disk where the locale directories live */
	char* locale_dir;
	char* default_locale;
} mod_xmltools_config;



/* allocates a char* to hold the name of the DTD language file 
	Prints to stderr and returns NULL if there was an error loading the file 
	default_locale comes from the apache config and is used only if no 
	locale is provided via URL 
	locale_dir also comes from the apache config.
	*/
char* get_dtd_lang_file(string_array* params, char* default_locale, char* locale_dir);
