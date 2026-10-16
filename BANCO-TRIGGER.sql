


INSERT INTO DIA_TRABALHADO
(DATA_TRABALHO, ID_USUARIO, STATUS, PACOTES_COLETADOS, VALOR_TOTAL)
VALUES(current_date, 10, 1, 1000, 45);


ALTER TABLE MOVIMENTACAO ADD CONSTRAINT fk_dia_trabalhado_movimentacao FOREIGN KEY (id_dia_trabalhado )
REFERENCES dia_trabalhado(id_dia_trabalhado)




CREATE OR ALTER TRIGGER tg_ai_dia_trabalhado
FOR dia_trabalhado ACTIVE  AFTER INSERT OR UPDATE OR delete 
AS 
BEGIN
	
	IF (INSERTING) THEN 
	begin
		INSERT INTO MOVIMENTACAO (VALOR, DATA_MOVIMENTACAO, DESCRICAO, TIPO, ID_USUARIO, ID_CATEGORIA, STATUS)
						  VALUES (:NEW.VALOR_TOTAL, CURRENT_DATE, 'Receita cadastrada pelo Dia Trabalhado', 2, :NEW.id_usuario, 2, 1);
	END
	ELSE iF (UPDATING) THEN
	BEGIN
		IF (:NEW.pacotes_coletados <> :OLD.pacotes_coletados) THEN 
		BEGIN 
			UPDATE MOVIMENTACAO SET valor = :NEW.valor_total,
			descricao = descricao || ' - Receita Alterada dia '|| CURRENT_DATE || ' de '|| cast(old.VALOR_TOTAL AS varchar(50))|| ' para '||  CAST(NEW.VALOR_TOTAL AS varchar(50))
			WHERE id_dia_trabalhado = :NEW.ID_dia_trabalhado;
		END
		IF (:NEW.STATUS = 0) THEN 
		BEGIN
			UPDATE MOVIMENTACAO SET STATUS = 0,
				descricao = descricao || ' - Receita Inativada dia '|| CURRENT_DATE
				WHERE id_dia_trabalhado = :NEW.ID_dia_trabalhado;
		END
		ELSE
		UPDATE MOVIMENTACAO SET STATUS = 1,
				descricao = descricao || ' - Receita Ativada dia '|| CURRENT_DATE
				WHERE id_dia_trabalhado = :NEW.ID_dia_trabalhado;
		
		
	END	
END