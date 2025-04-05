import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
  } from "react";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";
import { getCollisionResult } from "../utils/collisionRules";
import { DraggableObject, ObjectType } from "../types/types";

/**
 * 
 * 
 * @returns 
 */
export const useSceneLogic = () => {
    const objectRefs = useRef<Map<string, DraggableObject>>(new Map());
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_isDragging, setIsDragging] = useState(false); // ドラッグ状態を管理
    const [isModalOpen, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  useEffect(() => {
    setSelectedItems(Array.from(objectRefs.current.keys())); // `objectRefs` を `selectedItems` に同期
  }, []);

  // アイテム追加ボタンがクリックされたときのオブジェクトを追加

    // アイテム追加ボタンがクリックされたときのオブジェクトを追加
    const handleAddItem = useCallback((type: ObjectType) => {
      const id = uuidv4();
      const distance = 2;
      const direction = new THREE.Vector3(1, 0, 0).normalize();
      const offset = objectRefs.current.size * 2;
      const initialPosition = new THREE.Vector3(-2, 0, -0.6); // 初期位置を設定

      const newObj: DraggableObject = {
        id,
        objInfo: type, // ここで type を直接格納
        mesh: React.createRef<THREE.Mesh>(),
        position: initialPosition.add(
          direction.multiplyScalar(distance + offset)
        ), // 初期位置に基づいて位置を設定
        radius: 1,
      };

      objectRefs.current.set(id, newObj);
      setSelectedItems((prev) => [...prev, id]);
    }, []);

    const handleCollision = useCallback((ids: string[]) => {
      if (ids.length < 2 ) return; // 2つ未満では何も起こさない

      const objects = ids
        .map((id) => objectRefs.current.get(id))
        .filter((obj): obj is DraggableObject => obj !== undefined);

      if (objects.length != ids.length) return;

      const symbols = objects.map((obj) => obj.objInfo.symbol);
      // if (symbols.includes(undefined)) return;

      const newType = getCollisionResult(symbols);
      if (newType === null) return;

      const newPosition = objects
      .map((obj) => obj.position)
      .reduce((acc, pos) => acc.add(pos.clone()), new THREE.Vector3())
      .multiplyScalar(1 / objects.length);

      ids.forEach((id) => objectRefs.current.delete(id)); // 衝突したアイテムを削除

      const newId = uuidv4();
      // **衝突した位置の中間地点に新しいアイテムを配置**
      const newObj: DraggableObject = {
        id: newId,
        objInfo: {
          //エフェクト用
          symbol: newType,
          color: "red",
        },
        mesh: React.createRef<THREE.Mesh>(),
        position: newPosition,
        radius: 1,
      };

      objectRefs.current.set(newId, newObj);

      setSelectedItems((prev) => [
        ...prev.filter((id) => !ids.includes(id)),
        newId,
      ]);
    }, []);

    return {
      objectRefs,
      selectedItems,
      isModalOpen,
      handleOpen,
      handleClose,
      handleAddItem,
      handleCollision,
      setIsDragging,
    };
  };

