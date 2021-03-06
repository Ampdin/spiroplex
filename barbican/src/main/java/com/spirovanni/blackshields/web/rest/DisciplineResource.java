package com.spirovanni.blackshields.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.spirovanni.blackshields.service.DisciplineService;
import com.spirovanni.blackshields.web.rest.errors.BadRequestAlertException;
import com.spirovanni.blackshields.web.rest.util.HeaderUtil;
import com.spirovanni.blackshields.service.dto.DisciplineDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Discipline.
 */
@RestController
@RequestMapping("/api")
public class DisciplineResource {

    private final Logger log = LoggerFactory.getLogger(DisciplineResource.class);

    private static final String ENTITY_NAME = "discipline";

    private final DisciplineService disciplineService;

    public DisciplineResource(DisciplineService disciplineService) {
        this.disciplineService = disciplineService;
    }

    /**
     * POST  /disciplines : Create a new discipline.
     *
     * @param disciplineDTO the disciplineDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new disciplineDTO, or with status 400 (Bad Request) if the discipline has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/disciplines")
    @Timed
    public ResponseEntity<DisciplineDTO> createDiscipline(@Valid @RequestBody DisciplineDTO disciplineDTO) throws URISyntaxException {
        log.debug("REST request to save Discipline : {}", disciplineDTO);
        if (disciplineDTO.getId() != null) {
            throw new BadRequestAlertException("A new discipline cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DisciplineDTO result = disciplineService.save(disciplineDTO);
        return ResponseEntity.created(new URI("/api/disciplines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /disciplines : Updates an existing discipline.
     *
     * @param disciplineDTO the disciplineDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated disciplineDTO,
     * or with status 400 (Bad Request) if the disciplineDTO is not valid,
     * or with status 500 (Internal Server Error) if the disciplineDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/disciplines")
    @Timed
    public ResponseEntity<DisciplineDTO> updateDiscipline(@Valid @RequestBody DisciplineDTO disciplineDTO) throws URISyntaxException {
        log.debug("REST request to update Discipline : {}", disciplineDTO);
        if (disciplineDTO.getId() == null) {
            return createDiscipline(disciplineDTO);
        }
        DisciplineDTO result = disciplineService.save(disciplineDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, disciplineDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /disciplines : get all the disciplines.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of disciplines in body
     */
    @GetMapping("/disciplines")
    @Timed
    public List<DisciplineDTO> getAllDisciplines() {
        log.debug("REST request to get all Disciplines");
        return disciplineService.findAll();
        }

    /**
     * GET  /disciplines/:id : get the "id" discipline.
     *
     * @param id the id of the disciplineDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the disciplineDTO, or with status 404 (Not Found)
     */
    @GetMapping("/disciplines/{id}")
    @Timed
    public ResponseEntity<DisciplineDTO> getDiscipline(@PathVariable Long id) {
        log.debug("REST request to get Discipline : {}", id);
        DisciplineDTO disciplineDTO = disciplineService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(disciplineDTO));
    }

    /**
     * DELETE  /disciplines/:id : delete the "id" discipline.
     *
     * @param id the id of the disciplineDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/disciplines/{id}")
    @Timed
    public ResponseEntity<Void> deleteDiscipline(@PathVariable Long id) {
        log.debug("REST request to delete Discipline : {}", id);
        disciplineService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/disciplines?query=:query : search for the discipline corresponding
     * to the query.
     *
     * @param query the query of the discipline search
     * @return the result of the search
     */
    @GetMapping("/_search/disciplines")
    @Timed
    public List<DisciplineDTO> searchDisciplines(@RequestParam String query) {
        log.debug("REST request to search Disciplines for query {}", query);
        return disciplineService.search(query);
    }

}
