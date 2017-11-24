import _root_.io.gatling.core.scenario.Simulation
import ch.qos.logback.classic.{Level, LoggerContext}
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import org.slf4j.LoggerFactory

import scala.concurrent.duration._

/**
 * Performance test for the Skills entity.
 */
class SkillsGatlingTest extends Simulation {

    val context: LoggerContext = LoggerFactory.getILoggerFactory.asInstanceOf[LoggerContext]
    // Log all HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("TRACE"))
    // Log failed HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("DEBUG"))

    val baseURL = Option(System.getProperty("baseURL")) getOrElse """http://localhost:8080"""

    val httpConf = http
        .baseURL(baseURL)
        .inferHtmlResources()
        .acceptHeader("*/*")
        .acceptEncodingHeader("gzip, deflate")
        .acceptLanguageHeader("fr,fr-fr;q=0.8,en-us;q=0.5,en;q=0.3")
        .connectionHeader("keep-alive")
        .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:33.0) Gecko/20100101 Firefox/33.0")

    val headers_http = Map(
        "Accept" -> """application/json"""
    )

    val headers_http_authentication = Map(
        "Content-Type" -> """application/json""",
        "Accept" -> """application/json"""
    )

    val headers_http_authenticated = Map(
        "Accept" -> """application/json""",
        "Authorization" -> "${access_token}"
    )

    val scn = scenario("Test the Skills entity")
        .exec(http("First unauthenticated request")
        .get("/api/account")
        .headers(headers_http)
        .check(status.is(401))).exitHereIfFailed
        .pause(10)
        .exec(http("Authentication")
        .post("/api/authenticate")
        .headers(headers_http_authentication)
        .body(StringBody("""{"username":"admin", "password":"admin"}""")).asJSON
        .check(header.get("Authorization").saveAs("access_token"))).exitHereIfFailed
        .pause(1)
        .exec(http("Authenticated request")
        .get("/api/account")
        .headers(headers_http_authenticated)
        .check(status.is(200)))
        .pause(10)
        .repeat(2) {
            exec(http("Get all skills")
            .get("/armory/api/skills")
            .headers(headers_http_authenticated)
            .check(status.is(200)))
            .pause(10 seconds, 20 seconds)
            .exec(http("Create new skills")
            .post("/armory/api/skills")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "socSpecificSkName":"SAMPLE_TEXT", "socSpecificSkCode":"SAMPLE_TEXT", "anDaInLv":null, "anDaInIm":null, "asCaOthLv":null, "asCaOthIm":null, "coDevOthLv":null, "coDevOthIm":null, "coPerOutOrgLv":null, "coPerOutOrgIm":null, "coSupPeSubLv":null, "coSupPeSubIm":null, "conMaProLv":null, "conMaProIm":null, "cooWorActOthLv":null, "cooWorActOthIm":null, "devBuildTeamsLv":null, "devBuildTeamsIm":null, "devObjStratLv":null, "devObjStratIm":null, "docRecInfoLv":null, "docRecInfoIm":null, "drLayOutSpecLv":null, "drLayOutSpecIm":null, "estMaIntRelLv":null, "estMaIntRelIm":null}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_skills_url"))).exitHereIfFailed
            .pause(10)
            .repeat(5) {
                exec(http("Get created skills")
                .get("/armory${new_skills_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created skills")
            .delete("/armory${new_skills_url}")
            .headers(headers_http_authenticated))
            .pause(10)
        }

    val users = scenario("Users").exec(scn)

    setUp(
        users.inject(rampUsers(Integer.getInteger("users", 100)) over (Integer.getInteger("ramp", 1) minutes))
    ).protocols(httpConf)
}
