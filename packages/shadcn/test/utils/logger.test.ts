import { describe, expect, it, vi, beforeEach } from "vitest"
import { logger } from "../../src/utils/logger"

describe("logger", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, "log").mockImplementation(() => {})
    logger.setVerbose(false)
  })

  describe("verbose mode", () => {
    it("should be disabled by default", () => {
      expect(logger.isVerbose()).toBe(false)
    })

    it("should enable verbose mode when setVerbose(true) is called", () => {
      logger.setVerbose(true)
      expect(logger.isVerbose()).toBe(true)
    })

    it("should disable verbose mode when setVerbose(false) is called", () => {
      logger.setVerbose(true)
      logger.setVerbose(false)
      expect(logger.isVerbose()).toBe(false)
    })
  })

  describe("debug method", () => {
    it("should not log when verbose mode is disabled", () => {
      logger.setVerbose(false)
      logger.debug("test debug message")
      expect(console.log).not.toHaveBeenCalled()
    })

    it("should log when verbose mode is enabled", () => {
      logger.setVerbose(true)
      logger.debug("test debug message")
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("[debug]")
      )
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("test debug message")
      )
    })

    it("should join multiple arguments", () => {
      logger.setVerbose(true)
      logger.debug("test", "debug", "message")
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("[debug] test debug message")
      )
    })
  })

  describe("verbose method", () => {
    it("should not log when verbose mode is disabled", () => {
      logger.setVerbose(false)
      logger.verbose("test verbose message")
      expect(console.log).not.toHaveBeenCalled()
    })

    it("should log when verbose mode is enabled", () => {
      logger.setVerbose(true)
      logger.verbose("test verbose message")
      expect(console.log).toHaveBeenCalledWith("test verbose message")
    })

    it("should join multiple arguments", () => {
      logger.setVerbose(true)
      logger.verbose("test", "verbose", "message")
      expect(console.log).toHaveBeenCalledWith("test verbose message")
    })
  })

  describe("standard logging methods", () => {
    it("should always log error messages", () => {
      logger.setVerbose(false)
      logger.error("test error")
      expect(console.log).toHaveBeenCalled()
    })

    it("should always log warn messages", () => {
      logger.setVerbose(false)
      logger.warn("test warning")
      expect(console.log).toHaveBeenCalled()
    })

    it("should always log info messages", () => {
      logger.setVerbose(false)
      logger.info("test info")
      expect(console.log).toHaveBeenCalled()
    })

    it("should always log success messages", () => {
      logger.setVerbose(false)
      logger.success("test success")
      expect(console.log).toHaveBeenCalled()
    })

    it("should always log regular log messages", () => {
      logger.setVerbose(false)
      logger.log("test log")
      expect(console.log).toHaveBeenCalled()
    })
  })
})
