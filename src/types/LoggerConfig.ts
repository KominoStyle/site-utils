/**
 * Configuration options for the Logger.
 */
interface LoggerConfig {
    /**
     * Whether to log messages at the 'log' level.
     */
    log?: boolean
    /**
     * Whether to log messages at the 'info' level.
     */   
    info?: boolean
    /**
     * Whether to log messages at the 'warn' level.
     */
    warn?: boolean
}

/**
 * Configuration options for the Logger with an additional option to add duplicated level
 */
interface LoggerConfigAddDuplicated extends LoggerConfig {
    /**
     * Whether to log messages at the 'duplicate' level.
     */
    duplicate?: boolean
}