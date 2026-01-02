import { RegistryError } from "@/src/registry/errors"
import { highlighter } from "@/src/utils/highlighter"
import { logger } from "@/src/utils/logger"
import { z } from "zod"

export function handleError(error: unknown) {
  logger.break()
  logger.error(
    `Something went wrong. Please check the error below for more details.`
  )
  logger.error(`If the problem persists, please open an issue on GitHub.`)
  logger.error("")
  if (typeof error === "string") {
    logger.error(error)
    logger.break()
    process.exit(1)
  }

  if (error instanceof RegistryError) {
    if (error.message) {
      logger.error(error.cause ? "Error:" : "Message:")
      logger.error(error.message)
    }

    if (error.cause) {
      logger.error("\nMessage:")
      logger.error(error.cause)
    }

    if (error.suggestion) {
      logger.error("\nSuggestion:")
      logger.error(error.suggestion)
    }

    if (logger.isVerbose() && error.stack) {
      logger.error("\nStack trace:")
      logger.error(error.stack)
    }
    logger.break()
    process.exit(1)
  }

  if (error instanceof z.ZodError) {
    logger.error("Validation failed:")
    for (const [key, value] of Object.entries(error.flatten().fieldErrors)) {
      logger.error(`- ${highlighter.info(key)}: ${value}`)
    }
    logger.break()
    process.exit(1)
  }

  if (error instanceof Error) {
    logger.error(error.message)
    if (logger.isVerbose() && error.stack) {
      logger.error("\nStack trace:")
      logger.error(error.stack)
    }
    logger.break()
    process.exit(1)
  }

  logger.break()
  process.exit(1)
}
