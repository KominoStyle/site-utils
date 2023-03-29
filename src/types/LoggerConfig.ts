interface LoggerConfig {
    log?: boolean
    info?: boolean
    warn?: boolean
}

interface LoggerConfigAddDuplicated extends LoggerConfig {
    duplicate?: boolean
}