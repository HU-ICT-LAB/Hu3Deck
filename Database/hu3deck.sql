--
-- PostgreSQL database dump
--

-- Dumped from database version 11.7 (Raspbian 11.7-0+deb10u1)
-- Dumped by pg_dump version 11.7 (Raspbian 11.7-0+deb10u1)

-- Started on 2020-06-25 14:29:45 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2998 (class 1262 OID 16840)
-- Name: hu3deck; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE hu3deck WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


\connect hu3deck

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 205 (class 1259 OID 17022)
-- Name: api; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.api (
    id character varying NOT NULL,
    url character varying NOT NULL
);


--
-- TOC entry 201 (class 1259 OID 16975)
-- Name: background; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.background (
    id character varying NOT NULL,
    background_image_path character varying NOT NULL
);


--
-- TOC entry 208 (class 1259 OID 17099)
-- Name: fitbit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.fitbit (
    access_token character varying NOT NULL,
    refresh_token character varying NOT NULL,
    date timestamp without time zone NOT NULL
);


--
-- TOC entry 199 (class 1259 OID 16954)
-- Name: heartbeat; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.heartbeat (
    id character varying NOT NULL,
    session_id character varying NOT NULL,
    measurement_date timestamp without time zone NOT NULL,
    bpm integer NOT NULL
);


--
-- TOC entry 202 (class 1259 OID 16983)
-- Name: model; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.model (
    id character varying NOT NULL,
    model_path character varying NOT NULL,
    animation_mixer character varying,
    point_scale_id character varying NOT NULL,
    point_rotation_id character varying NOT NULL
);


--
-- TOC entry 204 (class 1259 OID 16999)
-- Name: movement; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.movement (
    id character varying NOT NULL,
    point_from_id character varying NOT NULL,
    point_to_id character varying,
    point_outer_id character varying,
    name character varying,
    movement_type character varying NOT NULL,
    easing character varying,
    loop character varying,
    duration integer,
    date_added timestamp without time zone NOT NULL,
    date_updated timestamp without time zone
);


--
-- TOC entry 203 (class 1259 OID 16991)
-- Name: point; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.point (
    id character varying NOT NULL,
    x_pos numeric(4,1),
    y_pos numeric(4,1),
    z_pos numeric(4,1)
);


--
-- TOC entry 206 (class 1259 OID 17030)
-- Name: prop; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.prop (
    id character varying NOT NULL,
    movement_id character varying,
    sound_id character varying,
    api_id character varying,
    model_id character varying,
    background_id character varying,
    name character varying NOT NULL,
    prop_type character varying NOT NULL,
    date_added timestamp without time zone NOT NULL,
    date_updated timestamp without time zone
);


--
-- TOC entry 197 (class 1259 OID 16928)
-- Name: scene; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scene (
    id character varying NOT NULL,
    title character varying NOT NULL
);


--
-- TOC entry 207 (class 1259 OID 17063)
-- Name: scene_props; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scene_props (
    scene_id character varying NOT NULL,
    prop_id character varying NOT NULL,
    default_shown boolean DEFAULT false NOT NULL
);


--
-- TOC entry 198 (class 1259 OID 16936)
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    id character varying NOT NULL,
    user_id character varying NOT NULL,
    scene_id character varying NOT NULL,
    name character varying NOT NULL,
    date_started timestamp without time zone NOT NULL,
    date_ended timestamp without time zone,
    date_updated timestamp without time zone
);


--
-- TOC entry 200 (class 1259 OID 16967)
-- Name: sound; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sound (
    id character varying NOT NULL,
    audio_path character varying NOT NULL,
    volume integer NOT NULL
);


--
-- TOC entry 196 (class 1259 OID 16920)
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id character varying NOT NULL,
    name character varying NOT NULL,
    middlename character varying,
    lastname character varying NOT NULL,
    age integer NOT NULL,
    date_added timestamp without time zone NOT NULL,
    date_updated timestamp without time zone
);


--
-- TOC entry 2854 (class 2606 OID 17029)
-- Name: api api_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.api
    ADD CONSTRAINT api_pkey PRIMARY KEY (id);


--
-- TOC entry 2846 (class 2606 OID 16982)
-- Name: background background_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.background
    ADD CONSTRAINT background_pkey PRIMARY KEY (id);


--
-- TOC entry 2842 (class 2606 OID 16961)
-- Name: heartbeat heartbeat_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.heartbeat
    ADD CONSTRAINT heartbeat_pkey PRIMARY KEY (id);


--
-- TOC entry 2848 (class 2606 OID 16990)
-- Name: model model_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.model
    ADD CONSTRAINT model_pkey PRIMARY KEY (id);


--
-- TOC entry 2852 (class 2606 OID 17006)
-- Name: movement movement_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movement
    ADD CONSTRAINT movement_pkey PRIMARY KEY (id);


--
-- TOC entry 2850 (class 2606 OID 16998)
-- Name: point point_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.point
    ADD CONSTRAINT point_pkey PRIMARY KEY (id);


--
-- TOC entry 2856 (class 2606 OID 17037)
-- Name: prop prop_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prop
    ADD CONSTRAINT prop_pkey PRIMARY KEY (id);


--
-- TOC entry 2838 (class 2606 OID 16935)
-- Name: scene scene_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scene
    ADD CONSTRAINT scene_pkey PRIMARY KEY (id);


--
-- TOC entry 2840 (class 2606 OID 16943)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- TOC entry 2844 (class 2606 OID 16974)
-- Name: sound sound_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sound
    ADD CONSTRAINT sound_pkey PRIMARY KEY (id);


--
-- TOC entry 2836 (class 2606 OID 16927)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2859 (class 2606 OID 16962)
-- Name: heartbeat heartbeat_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.heartbeat
    ADD CONSTRAINT heartbeat_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.session(id);


--
-- TOC entry 2861 (class 2606 OID 17085)
-- Name: model model_point_rotation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.model
    ADD CONSTRAINT model_point_rotation_id_fkey FOREIGN KEY (point_rotation_id) REFERENCES public.point(id);


--
-- TOC entry 2860 (class 2606 OID 17080)
-- Name: model model_point_scale_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.model
    ADD CONSTRAINT model_point_scale_id_fkey FOREIGN KEY (point_scale_id) REFERENCES public.point(id);


--
-- TOC entry 2862 (class 2606 OID 17007)
-- Name: movement movement_point_from_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movement
    ADD CONSTRAINT movement_point_from_id_fkey FOREIGN KEY (point_from_id) REFERENCES public.point(id);


--
-- TOC entry 2864 (class 2606 OID 17017)
-- Name: movement movement_point_outer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movement
    ADD CONSTRAINT movement_point_outer_id_fkey FOREIGN KEY (point_outer_id) REFERENCES public.point(id);


--
-- TOC entry 2863 (class 2606 OID 17012)
-- Name: movement movement_point_to_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movement
    ADD CONSTRAINT movement_point_to_id_fkey FOREIGN KEY (point_to_id) REFERENCES public.point(id);


--
-- TOC entry 2867 (class 2606 OID 17048)
-- Name: prop prop_api_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prop
    ADD CONSTRAINT prop_api_id_fkey FOREIGN KEY (api_id) REFERENCES public.api(id);


--
-- TOC entry 2869 (class 2606 OID 17058)
-- Name: prop prop_background_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prop
    ADD CONSTRAINT prop_background_id_fkey FOREIGN KEY (background_id) REFERENCES public.background(id);


--
-- TOC entry 2868 (class 2606 OID 17053)
-- Name: prop prop_model_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prop
    ADD CONSTRAINT prop_model_id_fkey FOREIGN KEY (model_id) REFERENCES public.model(id);


--
-- TOC entry 2865 (class 2606 OID 17038)
-- Name: prop prop_movement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prop
    ADD CONSTRAINT prop_movement_id_fkey FOREIGN KEY (movement_id) REFERENCES public.movement(id);


--
-- TOC entry 2866 (class 2606 OID 17043)
-- Name: prop prop_sound_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.prop
    ADD CONSTRAINT prop_sound_id_fkey FOREIGN KEY (sound_id) REFERENCES public.sound(id);


--
-- TOC entry 2871 (class 2606 OID 17074)
-- Name: scene_props scene_props_prop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scene_props
    ADD CONSTRAINT scene_props_prop_id_fkey FOREIGN KEY (prop_id) REFERENCES public.prop(id);


--
-- TOC entry 2870 (class 2606 OID 17069)
-- Name: scene_props scene_props_scene_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scene_props
    ADD CONSTRAINT scene_props_scene_id_fkey FOREIGN KEY (scene_id) REFERENCES public.scene(id);


--
-- TOC entry 2858 (class 2606 OID 16949)
-- Name: session session_scene_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_scene_id_fkey FOREIGN KEY (scene_id) REFERENCES public.scene(id);


--
-- TOC entry 2857 (class 2606 OID 16944)
-- Name: session session_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


-- Completed on 2020-06-25 14:29:46 CEST

--
-- PostgreSQL database dump complete
--

